import React, { useState } from 'react';

export function CollaboratorsModal(props) {
  const visiibility = props.modalVisibility ? "modal" : "modal hidden";
  
  function closeModal() {
	props.setModalVisibility(false);
  }
  
  return (
	<div className={ visiibility }>
	  <div className="modal--container">
	  	<h1>Manage Collaborators</h1>
		<div className="button-group">
			<a className="btn btn-outline" onClick={closeModal}>Cancel</a>
		</div>
	  </div>
	</div>
  );
}
