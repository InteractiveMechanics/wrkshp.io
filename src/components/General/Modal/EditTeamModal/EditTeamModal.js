import React, { useState } from 'react';

import { UpdateTeam } from '../../../../adapters/dashboard';

export function EditTeamModal(props) {	
  const [ name, setName ] = useState(props.team.name);
  
  let UpdateTeamVariables = {
	  _id: props.team._id,
		name: name
	}
	const UpdateTeamOnComplete = function(data) {
		closeModal();
	}
  const [updateTeam, { data, loading, error }] = UpdateTeam(UpdateTeamVariables, UpdateTeamOnComplete);
  
   
  function handleUpdateName(e) {
		setName(e.target.value);
  }
  
  function closeModal() {
		props.setModalVisibility(false);
  }

  
  return (
	<div className="form">
  	<fieldset className="margin-b-2x">
  		<label htmlFor="name" className="required">Team Name</label>
  		<input id="name" type="text" value={name} onChange={handleUpdateName} />
  	</fieldset>
		<div className="button-group right">
			<a className="btn btn-outline" onClick={closeModal}>Cancel</a>
			<a className="btn btn-primary" onClick={updateTeam}>Save</a>
		</div>
	</div>
  );
}
