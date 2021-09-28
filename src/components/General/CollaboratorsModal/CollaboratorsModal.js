import React from 'react';

export function CollaboratorsModal(props) {
  const visiibility = props.modalVisibility ? "modal fade in" : "modal fade";
  
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
	  	<h1>Manage Collaborators</h1>
			<div className="button-group">
				<button className="btn btn-outline" onClick={closeModal}>Cancel</button>
			</div>
	  </div>
	</div>
  );
}
