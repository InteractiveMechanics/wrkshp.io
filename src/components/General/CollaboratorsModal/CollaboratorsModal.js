import React from 'react';

import './CollaboratorsModal.css';

export function CollaboratorsModal(props) {
	const users = props.users;
  const visiibility = props.modalVisibility ? "modal fade in" : "modal fade";
  
  function closeModal() {
		props.setModalVisibility(false);
  }
  
  return (
		<div className={ visiibility }>
		  <div className="modal--header">
				<h2>Manage Collaborators</h2>
				<button className="modal--close" onClick={closeModal}><i className="bi-x-circle"></i></button>
		  </div>
		  <div className="modal--container">
		  	<div className="collaborators--list">
		  		<div className="collaborators--list-item">
		  			<div className="collaborator--details">
			  			<div className="avatar"><img src={ users[0].userId.avatar } /></div>
			  			<div className="metadata">
			  				<div className="name">{ users[0].userId.firstName } { users[0].userId.lastName }</div>
			  				<div className="email">{ users[0].userId.email }</div>
			  			</div>
			  		</div>
			  		<div className="collaborator--role">
			  			<select name="roles">
			  				<option value="owner">Owner</option>
								<option value="facilitator">Facilitator</option>
								<option value="participant">Participant</option>
								<option value="readonly">Viewer</option>
							</select>
			  		</div>
			  		<div className="collaborator--actions">
			  			<div className="button-group">
			  				<button><i className="bi-trash"></i></button>
			  			</div>
			  		</div>
		  		</div>
		  	</div>
		  	
				<div className="button-group">
					<button className="btn btn-primary" onClick={closeModal}>Save</button>
					<button className="btn btn-outline-primary" onClick={closeModal}>Cancel</button>
				</div>
		  </div>
		</div>
  );
}
