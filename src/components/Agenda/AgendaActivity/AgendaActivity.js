import React, { useState, useEffect } from 'react';
import { gql, useMutation } from "@apollo/client";

import { convertDate, convertTime } from '../../../utils/datetime';
import { DeleteActivityFromAgendaDay } from '../../../adapters/agenda';

import './AgendaActivity.css';


export function AgendaActivity(props) {
	const day = props.day;
	const activity = props.activity;
	const details = activity.activity;
		
	let variables = { agendaDayId: day._id, activityId: activity._id }
	const [removeActivityFromAgendaDay, { data, loading, error }] = DeleteActivityFromAgendaDay(variables, function() {}); 
	
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