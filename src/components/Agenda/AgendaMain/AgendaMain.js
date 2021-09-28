import React, { useState, useEffect } from 'react';
import { gql, useMutation } from "@apollo/client";
import { DragDropContext } from 'react-beautiful-dnd';

import { AgendaDay } from '../../Agenda';
import { ErrorMessage } from '../../General';
import { AddAgendaDayToWorkshop } from '../../../adapters/agenda';

import './AgendaMain.css';

export function AgendaMain(props) {
	const workshop = props.workshop;
	const agenda = workshop.agenda;
	const [ errorMsg, setErrorMsg ] = useState();
	
	let variables = { workshopId: workshop._id };
	const [insertAgendaDayToWorkshop, { data, loading, error }] = AddAgendaDayToWorkshop(variables, function() {});
  
  let days = '';
  if (agenda) {
		days = agenda.map((day, index) => ( 
			<AgendaDay
				key={index}
				day={day}
				daysTotal={agenda.length}
				dayCount={index + 1}
				
				setErrorMsg={setErrorMsg} />
		));
	}
	
	function onDragEnd(result) {
		
	}
	
  return (
		<main className="agenda">
		  <h1 className="margin-b-2x">Agenda</h1>
		  <ErrorMessage 
		  	errorMsg={errorMsg}
		  	setErrorMsg={setErrorMsg} />
		  
		  <div className="agenda--day-list">
		    <DragDropContext
		    	onDragEnd={onDragEnd}>
		  			{ days }
		  	</DragDropContext>
		  </div>
		  
		  <div className="button-group centered">
		  	<button className="btn btn-lg btn-primary" onClick={insertAgendaDayToWorkshop}><i className="bi-plus-lg margin-r-1x"></i> Add Day</button>
		  </div>
		</main>
  );
}
