import React, { useState, useEffect } from 'react';
import { gql, useMutation } from "@apollo/client";

import { convertTime } from '../../../utils/datetime';
import { UpdateAgendaActivity, DeleteActivityFromAgendaDay } from '../../../adapters/agenda';

import './AgendaActivity.css';


export function AgendaActivity(props) {
	const day = props.day;
	const index = props.index;
	const startTime = props.startTime;
	const totalTime = parseInt(startTime) + (parseInt(props.totalTime) * 60000);
	const activity = props.activity;
	const details = activity.activity;
	
	const [ duration, setDuration ] = useState(props.activity.duration);
	
	useEffect(() => {
		if (duration == "NaN" || "" || null) { setDuration(0) }
		updateAgendaActivity();
	}, [duration]);
	
	let updateAgendaActivityVariables = { agendaDayId: day._id, activityId: activity._id, weight: props.activity.weight, duration: duration }
	const [updateAgendaActivity, { data, loading, error }] = UpdateAgendaActivity(updateAgendaActivityVariables, function() {});
		
	let deleteActivityFromAgendaDayVariables = { agendaDayId: day._id, activityId: activity._id }
	const [removeActivityFromAgendaDay, { data2, loading2, error2 }] = DeleteActivityFromAgendaDay(deleteActivityFromAgendaDayVariables, function() {}); 
	
	function incrementDuration() {
		setDuration(parseInt(duration) + 5);
	}
	function decrementDuration() {
		if (duration >= 5) {
			setDuration(parseInt(duration) - 5);
		} else {
			setDuration(0);
		}
	}
	function changeDuration(e) {
		setDuration(parseInt(e.target.value));
	}
	
	return (
		<div className="agenda--day--activity">
  		<div className="draggable"><i className="bi-grip-vertical"></i></div>
  		<div className="agenda--activity--time">
  			<div className="agenda--activity--start-time">{ convertTime(totalTime) }</div>
  			<fieldset>
  				<button className="btn btn-sm btn-text-secondary" onClick={decrementDuration}><i className="bi-dash-circle"></i></button>
  				<input type="text" value={duration} onChange={changeDuration} min="0" />
					<button className="btn btn-sm btn-text-secondary" onClick={incrementDuration}><i className="bi-plus-circle"></i></button>
				</fieldset>
  		</div>
  		<div className="agenda--activity--description">
  			<h3>{details.day}</h3>
  			<p>{details.description}</p>
  			<div className="button-group">
					<button className="btn btn-sm btn-text-secondary"><i className="bi-gear-fill"></i> Edit Settings</button>
					<button className="btn btn-sm btn-text-danger" onClick={removeActivityFromAgendaDay}><i className="bi-trash"></i> Delete Activity</button>
				</div>
  		</div>
  	</div>
	);
}