import React, { useState, useEffect } from 'react';
import { gql, useMutation } from "@apollo/client";

import { convertDate, convertTime } from '../../../utils/datetime';
import { AddActivityToAgendaDay, DeleteAgendaDayFromWorkshop } from '../../../adapters/agenda';
import { AgendaActivity } from '../../Agenda';

export function AgendaDay(props) {
	const day = props.day;
	const timestamp = props.day.startTime;
	const date = convertDate(timestamp);
	const time = convertTime(timestamp);
	
	const [ activityId, setActivityId ] = useState('');
	
	let deleteAgendaDayFromWorkshopVariables = { _id: day._id }
	const [removeAgendaDayFromWorkshop, { data, loading, error }] = DeleteAgendaDayFromWorkshop(deleteAgendaDayFromWorkshopVariables, function() {});
	
	let addActivityToAgendaDayVariables = { agendaDayId: day._id, activityId: activityId };
	const [insertActivityToAgendaDay, { data2, loading2, error2 }] = AddActivityToAgendaDay(addActivityToAgendaDayVariables, function() {});
	
	useEffect(() => {
		if (activityId != ''){
			insertActivityToAgendaDay();
			setActivityId('');
		}
	}, [activityId]);
	
	function checkDaysAndRemove() {
		if (props.daysTotal > 1) {
			removeAgendaDayFromWorkshop()
		} else {
			props.setErrorMsg("Each workshop must have at least one day in the agenda.");
		}
	}
	
	function addBreak() {
		setActivityId("61507edcb2924f8affee9bc5");
	}
	
	let activities = '';
  if (props.day.activities) {
		activities = props.day.activities.map((activity, index) => (
			<AgendaActivity
				key={index}
				day={props.day}
				activity={activity} />
		));
	}
	
  return (
  	<div className="agenda--day">
	    <div className="draggable"><i className="bi-grip-vertical"></i></div>
	    <div className="agenda--day--header">
	      <h2>Day {props.dayCount}</h2>
	      <div className="button-group">
	      	<button className="btn btn-sm btn-text-secondary"><i className="bi-calendar2-date"></i> { date }</button>
					<button className="btn btn-sm btn-text-secondary"><i className="bi-clock"></i> { time }</button>
					<button className="btn btn-sm btn-text-danger" onClick={checkDaysAndRemove}><i className="bi-trash"></i> Delete Day</button>
				</div>
	    </div>
	    <div className="agenda--day--activity-list">
	    	{ activities }
	    </div>
	    <div className="agenda--day--activity-buttons button-group">
	    	<button className="btn btn-primary"><i className="bi-plus"></i> Add Activity</button>
	    	<button className="btn btn-outline-primary" onClick={addBreak}><i className="bi-cup"></i> Add Break</button>
	    	<button className="btn btn-outline-primary hidden"><i className="bi-tv"></i> Add Presentation</button>
	    </div>
	  </div>
  );
}