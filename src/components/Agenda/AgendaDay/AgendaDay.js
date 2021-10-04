import React, { useState, useEffect } from 'react';
import { gql, useMutation } from "@apollo/client";
import { DragDropContext } from 'react-beautiful-dnd';
import DatePicker from "react-datepicker";

import { convertDate, convertTime } from '../../../utils/datetime';
import { AddActivityToAgendaDay, UpdateAgendaDay, DeleteAgendaDayFromWorkshop } from '../../../adapters/agenda';
import { AgendaActivity } from '../../Agenda';

import './AgendaDay.css';


export function AgendaDay(props) {
	const day = props.day;
	const timestamp = props.day.startTime;
	let totalTime = 0;
	
	const [ popupVisibility, setPopupVisibility ] = useState(false);
	const [ weight, setWeight ] = useState(day.weight);
	const [ datetime, setDatetime ] = useState(timestamp);
	const [ activityId, setActivityId ] = useState('');
	
	const visibility = popupVisibility ? "activities--popup fade in" : "activities--popup fade";
	
	let deleteAgendaDayFromWorkshopVariables = { _id: day._id }
	const [removeAgendaDayFromWorkshop, { data, loading, error }] = DeleteAgendaDayFromWorkshop(deleteAgendaDayFromWorkshopVariables, function() {});
	
	let addActivityToAgendaDayVariables = { agendaDayId: day._id, activityId: activityId };
	const [insertActivityToAgendaDay, { data2, loading2, error2 }] = AddActivityToAgendaDay(addActivityToAgendaDayVariables, function() {});
	
	let updateAgendaDayVariables = { _id: day._id, startTime: String(datetime) }
	const [updateAgendaDay, { data3, loading3, error3 }] = UpdateAgendaDay(updateAgendaDayVariables, function() {});
	
	
	useEffect(() => {
		if (activityId != ''){
			insertActivityToAgendaDay();
			setActivityId('');
		}
	}, [activityId]);

	useEffect(() => {
		updateAgendaDay();
	}, [datetime, weight]);
	
	function checkDaysAndRemove() {
		if (props.daysTotal > 1) {
			removeAgendaDayFromWorkshop()
		} else {
			props.setErrorMsg("Each workshop must have at least one day in the agenda.");
		}
	}
	
	function addActivity(e) {
		setActivityId(e.target.id);
		setPopupVisibility(false);
	}
	
	function toggleActivitiesPopup() {
		if (popupVisibility) {
			setPopupVisibility(false);
		} else {
			setPopupVisibility(true);
		}
  }
	
	
	let activities = '';
  if (props.day.activities) {
		activities = props.day.activities.map((activity, index) => {
			totalTime += activity.duration;
			return (
				<AgendaActivity
					key={index}
					index={index}
					day={props.day}
					startTime={timestamp}
					totalTime={totalTime}
					activity={activity} />
			)
		});
	}
	
	const Datepicker = React.forwardRef(({ value, onClick }, ref) => (
	  <button className="btn btn-sm btn-text-secondary" onClick={onClick} ref={ref}><i className="bi-calendar2-date"></i> { value }</button>
	));
	
	const Timepicker = React.forwardRef(({ value, onClick }, ref) => (
	  <button className="btn btn-sm btn-text-secondary" onClick={onClick} ref={ref}><i className="bi-clock"></i> { value }</button>
	));
	
  return (
  	<div className="agenda--day">
	    <div className="draggable"><i className="bi-grip-vertical"></i></div>
	    <div className="agenda--day--header">
	      <h2>Day {props.dayCount}</h2>
	      <div className="button-group">
	      	<DatePicker 
	      		selected={new Date(parseInt(datetime))} 
	      		onChange={(date) => setDatetime(date.getTime())} 
	      		customInput={<Datepicker />} />
	      		
	      	<DatePicker 
	      		selected={new Date(parseInt(datetime))} 
	      		onChange={(date) => setDatetime(date.getTime())} 
	      		customInput={<Timepicker />} 
	      		showTimeSelect
						showTimeSelectOnly
						timeIntervals={15}
						timeCaption="Time"
						dateFormat="h:mm aa" />
	      	
					<button className="btn btn-sm btn-text-danger" onClick={checkDaysAndRemove}><i className="bi-trash"></i> Delete Day</button>
				</div>
	    </div>
	    
			<div className="agenda--day--activity-list">
				{ activities }
			</div>
	    
	    <div className="agenda--day--activity-buttons button-group centered">
	    	<button className="btn btn-primary" onClick={toggleActivitiesPopup}><i className="bi-plus-lg margin-r-1x"></i> Add Activity</button>
	    	<button className="btn btn-outline-primary" id="61507edcb2924f8affee9bc5" onClick={addActivity}><i className="bi-cup margin-r-1x"></i> Add Break</button>
	    	<button className="btn btn-outline-primary hidden"><i className="bi-tv margin-r-1x"></i> Add Presentation</button>
	    	
	    	<div className={visibility}>
	    		<div className="activities--popup--col">
	    			<h5 className="margin-b-1x">Ideation</h5>
	    			<span id="61507f3fb2924f8affee9bc8" onClick={addActivity}>Brainstorm</span>
	    		</div>
	    		<div className="activities--popup--col">
	    			<h5 className="margin-b-1x">Icebreakers</h5>
	    			<span>Two Truths & A Lie</span>
	    		</div>
	    	</div>
	    </div>
	  </div>
  );
}