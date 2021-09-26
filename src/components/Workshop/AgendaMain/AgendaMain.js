import React, { useState } from 'react';
import { gql, useMutation } from "@apollo/client";
import { AgendaDay } from '../../Workshop';

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
				day={day}
				dayCount={index + 1} /> 
		));
	}
	
  return (
		<main className="agenda">
		  <h1>Agenda</h1>
		  { days }
		  
		  <button className="btn btn-lg btn-primary" onClick={insertAgendaDayToWorkshop}><i className="bi-plus"></i> Add Day</button>
		</main>
  );
}
