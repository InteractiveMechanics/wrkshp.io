import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { AddWorkshop, AddWorkshopToTeam } from '../../../../adapters/dashboard';
import { AddAgendaDayToWorkshop } from '../../../../adapters/agenda';

const userId = "614354c98fd4395885f2b145";

export function CreateNewWorkshopModal(props) {
  const [ name, setName ] = useState('');
  const [ workshopId, setWorkshopId ] = useState('');

  const teamId = props.currentTeam._id;
  let history = useHistory();
  
  
  let AddWorkshopVariables = {
		name: name,
		userId: userId
	}
  let AddWorkshopCompleted = function(data) {
		setWorkshopId(data.addWorkshop._id);
		addWorkshopToTeam();
	}
  const [addWorkshop, { data, loading, error }] = AddWorkshop(AddWorkshopVariables, AddWorkshopCompleted);
  
  
  let AddWorkshopToTeamVariables = {
  	workshopId: workshopId,
  	teamId: teamId
  }
  let AddWorkshopToTeamCompleted = function() {
		addAgendaDayToWorkshop();
	}
	const [addWorkshopToTeam, { data2, loading2, error2 }] = AddWorkshopToTeam(AddWorkshopToTeamVariables, AddWorkshopToTeamCompleted);
	
	
	let AddAgendaDayToWorkshopVariables = { workshopId: workshopId };
	let AddAgendaDayToWorkshopCompleted = function() {
		const path = "/workshop/" + workshopId + "/agenda";
		history.push(path)
	}
	const [addAgendaDayToWorkshop, { data3, loading3, error3 }] = AddAgendaDayToWorkshop(AddAgendaDayToWorkshopVariables, AddAgendaDayToWorkshopCompleted);
  
  
  function handleUpdateName(e) {
		setName(e.target.value);
  }
  
  function closeModal() {
		props.setModalVisibility(false);
  }

  
  return (
	<div className="form">
  	<fieldset className="margin-b-2x">
  		<label htmlFor="name" className="required">Workshop Name</label>
  		<input id="name" type="text" value={name} onChange={handleUpdateName} />
  	</fieldset>
  	<fieldset className="margin-b-2x">
  		<label htmlFor="name" className="required">Workshop Description</label>
  		<input id="name" type="text" value={name} onChange={handleUpdateName} />
  	</fieldset>
		<div className="button-group right">
			<a className="btn btn-outline" onClick={closeModal}>Cancel</a>
			<a className="btn btn-primary" onClick={addWorkshop}>Create</a>
		</div>
	</div>
  );
}
