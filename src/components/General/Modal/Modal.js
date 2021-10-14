import React from 'react';
import { CollaboratorsModal } from './CollaboratorsModal/CollaboratorsModal'
import { CreateNewWorkshopModal } from './CreateNewWorkshopModal/CreateNewWorkshopModal';

export function Modal(props) {
  const visibility = props.modalVisibility ? "modal fade in" : "modal fade";
  
  function closeModal() {
		props.setModalVisibility(false);
  }
  
  return (
		<div className={ visibility }>
		  <div className="modal--header">
				<h2>{props.title}</h2>
				<button className="modal--close" onClick={closeModal}><i className="bi-x-circle"></i></button>
		  </div>
		  <div className="modal--container">
				{ props.children }
		  </div>
		</div>
  );
}

export { CollaboratorsModal, CreateNewWorkshopModal }