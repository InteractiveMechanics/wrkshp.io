import React, { useState } from 'react';

export function CollaboratorsModal(props) {
  const visiibility = props.modalVisibility ? "modal" : "modal hidden";
  
  function closeModal() {
		props.setModalVisibility(false);
  }
  
  return (
	<div className={ visiibility }>
	  <div className="modal--header">
			<h1>Create New Workshop</h1>
			<button className="modal--close"><i className="bi-x-circle"></i></button>
	  </div>
	  <div className="modal--container">
	  	<h1>Manage Collaborators</h1>
			<div className="button-group">
				<a className="btn btn-outline" onClick={closeModal}>Cancel</a>
			</div>
	  </div>
	</div>
  );
}
