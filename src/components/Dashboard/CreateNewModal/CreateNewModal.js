import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { AddWorkshop, AddWorkshopToTeam } from '../../../adapters/dashboard';

import './CreateNewModal.css';

const userId = "614354c98fd4395885f2b145";

export function CreateNewModal(props) {
  const [ name, setName ] = useState('');
  const [ workshopId, setWorkshopId ] = useState('');
  const visiibility = props.modalVisibility ? "modal fade in" : "modal fade";
  
  const teamId = props.currentTeam._id;
  let history = useHistory();
  
  
  let AddWorkshopVariables = {
		name: name,
		userId: userId
	}
  let AddWorkshopCompleted = function(data) {
		setWorkshopId(data.addWorkshop._id);
		insertWorkshopToTeam();
	}
  const [insertWorkshop, { data, loading, error }] = AddWorkshop(AddWorkshopVariables, AddWorkshopCompleted);
  
  
  let AddWorkshopToTeamVariables = {
  	workshopId: workshopId,
  	teamId: teamId
  }
  let AddWorkshopToTeamCompleted = function() {
		const path = "/workshop/" + workshopId + "/agenda";
		history.push(path)
	}
	const [insertWorkshopToTeam, { data2, loading2, error2 }] = AddWorkshopToTeam(AddWorkshopToTeamVariables, AddWorkshopToTeamCompleted);
  
  
  function handleUpdateName(e) {
		setName(e.target.value);
  }
  
  function closeModal() {
		props.setModalVisibility(false);
  }
  
  return (
	<div className={ visiibility }>
		<div className="modal--header">
			<h2>Create New Workshop</h2>
			<button className="modal--close" onClick={closeModal}><i className="bi-x-circle"></i></button>
	  </div>
	  <div className="modal--container">
	  	<fieldset>
	  		<label htmlFor="name">Workshop Name</label>
	  		<input id="name" type="text" value={name} onChange={handleUpdateName} />
	  	</fieldset>
			<div className="button-group">
				<a className="btn btn-primary" onClick={insertWorkshop}>Create</a>
				<a className="btn btn-outline" onClick={closeModal}>Cancel</a>
			</div>
	  </div>
	</div>
  );
}
