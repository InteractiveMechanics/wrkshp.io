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

export function AgendaDay(props) {
	const _id = props.day._id;
	const timestamp = props.day.startTime;
	const date = convertDate(timestamp);
	const time = convertTime(timestamp);
	
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
	
  return (
  	<div className="agenda--day">
	    <div className="draggable"><i className="bi-grip-vertical"></i></div>
	    <div className="agenda--day--header">
	      <h2>Day {props.dayCount}</h2>
	      <div className="button-group">
	      	<button className="btn btn-sm btn-text-secondary"><i className="bi-calendar2-date"></i> { date }</button>
					<button className="btn btn-sm btn-text-secondary"><i className="bi-clock"></i> { time }</button>
					<button className="btn btn-sm btn-text-danger" onClick={removeAgendaDayFromWorkshop}><i className="bi-trash"></i> Delete Day</button>
				</div>
	    </div>
	    <div className="agenda--day--activity-list">
	    	<div className="agenda--day--activities">
	    		<div className="draggable"><i className="bi-grip-vertical"></i></div>
	    		<div className="agenda--activity--time">
	    			<div className="agenda--activity--start-time">9:00AM</div>
	    			<fieldset>
	    				<button className="btn btn-sm btn-text-secondary"><i className="bi-dash-circle"></i></button>
	    				<input type="text" />
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
	    </div>
	  </div>
  );
}
