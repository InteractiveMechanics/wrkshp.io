import React, { useState } from 'react';
import { gql, useMutation } from "@apollo/client";
import { convertDate, convertTime } from '../../../utils/datetime';

const deleteAgendaDayFromWorkshop = gql`
	mutation deleteAgendaDayFromWorkshop($_id: ID!) {
	  deleteAgendaDayFromWorkshop(_id: $_id) {
	    _id
	  }
	}
`;

const addActivityToAgendaDay = gql`
	mutation addActivityToAgendaDay($agendaDayId: ID!, $activityId: ID!) {
	  addActivityToAgendaDay(agendaDayId: $agendaDayId, activityId: $activityId) {
	    _id
	  }
	}
`;

export function AgendaDay(props) {
	const _id = props.day._id;
	const timestamp = props.day.startTime;
	const date = convertDate(timestamp);
	const time = convertTime(timestamp);
	
	const [activityId, setActivityId] = useState('');
	
	const [removeAgendaDayFromWorkshop, { data, loading, error }] = useMutation(
  	deleteAgendaDayFromWorkshop,
  	{
  		variables: {
  			_id: _id,
  		},
  		refetchQueries: [
  			'getWorkshops'
  		]
	});
	
	const [insertActivityToAgendaDay, { data2, loading2, error2 }] = useMutation(
  	addActivityToAgendaDay,
  	{
  		variables: {
	  		agendaDayId: _id,
  			activityId: activityId,
  		},
  		refetchQueries: [
  			'getWorkshops'
  		]
	});
	
	function checkDaysAndRemove() {
		if (props.daysTotal > 1) {
			removeAgendaDayFromWorkshop()
		} else {
			props.setErrorMsg("Each workshop must have at least one day in the agenda.");
		}
	}
	
	function addBreak() {
		setActivityId("61507edcb2924f8affee9bc5");
		console.log(activityId, _id);
		insertActivityToAgendaDay();
	}
	
	let activities = '';
  if (props.day.activities) {
		activities = props.day.activities.map((activity, index) => ( 
			<AgendaDayActivity
				key={index}
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
	    	<button className="btn btn-outline-primary"><i className="bi-tv"></i> Add Presentation</button>
	    </div>
	  </div>
  );
}

export function AgendaDayActivity(props) {
	const activity = props.activity;
	
	function changeDuration() {

	}
	
	return (
		<div className="agenda--day--activity">
  		<div className="draggable"><i className="bi-grip-vertical"></i></div>
  		<div className="agenda--activity--time">
  			<div className="agenda--activity--start-time">9:00AM</div>
  			<fieldset>
  				<button className="btn btn-sm btn-text-secondary"><i className="bi-dash-circle"></i></button>
  				<input type="text" value={activity.duration} onChange={changeDuration} />
					<button className="btn btn-sm btn-text-secondary"><i className="bi-plus-circle"></i></button>
				</fieldset>
  		</div>
  		<div className="agenda--activity--description">
  			<h3>Exercise</h3>
  			<p>Individual brainstorming activity lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut nibh cursus, egestas ante sit amet, gravida dolor.</p>
  			<div className="button-group">
				<button className="btn btn-sm btn-text-secondary"><i className="bi-gear-fill"></i> Edit Settings</button>
				<button className="btn btn-sm btn-text-danger"><i className="bi-trash"></i> Delete Activity</button>
			</div>
  		</div>
  	</div>
	);
}