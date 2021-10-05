import React from 'react';

import './CollaboratorsModal.css';

export function CollaboratorsModal(props) {
	const users = props.users;
  const visiibility = props.modalVisibility ? "modal fade in" : "modal fade";
  
  let userList = '';
  
  function closeModal() {
		props.setModalVisibility(false);
  }
  function handleChange(e) {
	  
  }
  
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
		<div className={ visiibility }>
		  <div className="modal--header">
				<h2>Manage Collaborators</h2>
				<button className="modal--close" onClick={closeModal}><i className="bi-x-circle"></i></button>
		  </div>
		  <div className="modal--container">
		  	<div className="collaborators--list">
		  		{ userList }
		  	</div>
		  	
				<div className="button-group margin-t-2x">
					<button className="btn btn-primary" onClick={closeModal}>Save</button>
					<button className="btn btn-outline-primary" onClick={closeModal}>Cancel</button>
				</div>
		  </div>
		</div>
  );
}
