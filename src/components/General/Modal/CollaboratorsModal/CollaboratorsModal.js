import React from 'react';

import './CollaboratorsModal.css';

export function CollaboratorsModal(props) {
	const users = props.users;
	
	function handleChange(e) {
		
	}
	
	function closeModal() {
		props.setModalVisibility(false);
  }
	  
  let userList = '';
  if (users) {
		userList = users.map((user) => {			
			return (
			  <div className="collaborators--list-item" key={user.userId._id}>
	  			<div className="collaborator--details">
		  			<div className="avatar margin-r-1x"><img src={ user.userId.avatar } /></div>
		  			<div className="metadata">
		  				<div className="name">{ user.userId.firstName } { user.userId.lastName }</div>
		  				<div className="email text-muted text-sm">{ user.userId.email }</div>
		  			</div>
		  		</div>
		  		<div className="collaborator--role">
		  			<select name="roles" value={ user.permission } onChange={handleChange}>
		  				<option value="owner">Owner</option>
							<option value="facilitator">Facilitator</option>
							<option value="participant">Participant</option>
							<option value="readonly">Viewer</option>
						</select>
		  		</div>
		  		<div className="collaborator--actions">
		  			<div className="button-group">
		  				<button className="btn btn-text-danger"><i className="bi-trash"></i></button>
		  			</div>
		  		</div>
	  		</div>
	  		
			)
		})
  }
  
  return (
  	<div className="collaborators--list">
  		{ userList }
  		
  		<div className="button-group margin-t-2x">
				<button className="btn btn-primary" onClick={closeModal}>Save</button>
				<button className="btn btn-outline-primary" onClick={closeModal}>Cancel</button>
			</div>
  	</div>
  );
}
