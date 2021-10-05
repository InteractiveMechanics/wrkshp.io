import React, { useState, useEffect } from 'react';
import { gql, useMutation } from "@apollo/client";

import { convertTime } from '../../../utils/datetime';
import { UpdateAgendaActivity, DeleteActivityFromAgendaDay } from '../../../adapters/agenda';

import './AgendaActivity.css';


export function AgendaActivity(props) {
	const day = props.day;
	const index = props.index;
	const startTime = props.startTime;
	const totalTime = parseInt(startTime) + ((parseInt(props.totalTime) - parseInt(props.activity.duration)) * 60000);
	const activity = props.activity;
	const details = activity.activity;
	
	const [ duration, setDuration ] = useState(props.activity.duration);
	const [ decrementDisabled, setDecrementDisabled ] = useState(false);
	
	
	let updateAgendaActivityVariables = { agendaDayId: day._id, activityId: activity._id, weight: props.activity.weight, duration: duration }
	const [updateAgendaActivity] = UpdateAgendaActivity(updateAgendaActivityVariables, function() {});
		
	let deleteActivityFromAgendaDayVariables = { agendaDayId: day._id, activityId: activity._id }
	const [deleteActivityFromAgendaDay] = DeleteActivityFromAgendaDay(deleteActivityFromAgendaDayVariables, function() {}); 
	
	
	useEffect(() => {
		if (duration == "NaN" || "" || null) { setDuration(0) }
		updateAgendaActivity();
	}, [duration]);
	
	useEffect(() => {
		setDuration(props.activity.duration);
	}, [props.activity.duration]);
	
		
	function incrementDuration() {
		setDuration(parseInt(duration) + 5);
		checkForDisabled();
	}
	function decrementDuration() {
		if (duration >= 5) {
			setDuration(parseInt(duration) - 5);
		} else {
			setDuration(0);
		}
		checkForDisabled();
	}
	function changeDuration(e) {
		setDuration(parseInt(e.target.value));
		checkForDisabled();
	}
	function checkForDisabled() {
		if (duration < 5) {
			setDecrementDisabled(true);
		} else {
			setDecrementDisabled(false);
		}
	}
	
	return (
		<div className="agenda--day--activity">
  		<div className="draggable"><i className="bi-grip-vertical"></i></div>
  		<div className="agenda--activity--time">
  			<div className="agenda--activity--start-time">{ convertTime(totalTime) }</div>
  			<fieldset className="inline">
  				<button className="btn btn-sm btn-icon" onClick={decrementDuration} disabled={decrementDisabled}><i className="bi-dash-circle"></i></button>
  				<input type="number" value={duration} onChange={changeDuration} min="0" />
					<button className="btn btn-sm btn-icon" onClick={incrementDuration}><i className="bi-plus-circle"></i></button>
				</fieldset>
  		</div>
  		<div className="agenda--activity--description">
  			<h3>{details.name}</h3>
  			<p>{details.description}</p>
  			<div className="button-group">
					<button className="btn btn-sm btn-text-secondary"><i className="bi-gear-fill"></i> Edit Settings</button>
					<button className="btn btn-sm btn-text-danger" onClick={deleteActivityFromAgendaDay}><i className="bi-trash"></i> Delete Activity</button>
				</div>
  		</div>
  	</div>
	);
}