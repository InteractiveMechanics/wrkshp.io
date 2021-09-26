import React, { useState, useEffect } from 'react';
import { gql, useMutation } from "@apollo/client";
import { AgendaDay } from '../../Workshop';
import { ErrorMessage } from '../../Alerts';

import './AgendaMain.css';

const addAgendaDayToWorkshop = gql`
  mutation addAgendaDayToWorkshop($workshopId: ID!) {
	  addAgendaDayToWorkshop(workshopId: $workshopId) {
	    _id
	  }
	}
`;

export function AgendaMain(props) {
	const workshop = props.workshop;
	const agenda = workshop.agenda;
	const [ errorMsg, setErrorMsg ] = useState();
	
	const [insertAgendaDayToWorkshop, { data, loading, error }] = useMutation(
  	addAgendaDayToWorkshop,
  	{
  		variables: {
  			workshopId: workshop._id,
  		},
  		refetchQueries: [
  			'getWorkshops'
  		]
	});
  
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
	
	if (errorMsg) {
		
	}
	
  return (
		<main className="agenda">
		  <h1>Agenda</h1>
		  <ErrorMessage 
		  	errorMsg={errorMsg}
		  	setErrorMsg={setErrorMsg} />
		  	
		  { days }
		  
		  <button className="btn btn-lg btn-primary" onClick={insertAgendaDayToWorkshop}><i className="bi-plus"></i> Add Day</button>
		</main>
  );
}
