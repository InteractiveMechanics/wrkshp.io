import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { useUser } from '../../../../hooks/useUser';
import { AddTeam } from '../../../../adapters/dashboard';

export function CreateNewTeamModal(props) {
	const { state } = useUser();
	
  const [ name, setName ] = useState('');
  
  
  let AddTeamVariables = {
		name: name,
		organizationId: props.currentOrg._id,
		userId: state.user._id
	}
	const AddTeamOnComplete = function(data) {
		closeModal();
		// Set current team to new team
	}
  const [addTeam, { data, loading, error }] = AddTeam(AddTeamVariables, AddTeamOnComplete);
  
   
  function handleUpdateName(e) {
		setName(e.target.value);
  }
  
  function closeModal() {
		props.setModalVisibility(false);
		setName('');
  }

  
  return (
	<div className="form">
  	<fieldset className="margin-b-2x">
  		<label htmlFor="name" className="required">Team Name</label>
  		<input id="name" type="text" value={name} onChange={handleUpdateName} />
  	</fieldset>
		<div className="button-group right">
			<a className="btn btn-outline" onClick={closeModal}>Cancel</a>
			<a className="btn btn-primary" onClick={addTeam}>Create</a>
		</div>
	</div>
  );
}
