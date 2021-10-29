import React, { useState, useEffect } from 'react';
import { CollaboratorsModal } from './CollaboratorsModal/CollaboratorsModal'
import { CreateNewWorkshopModal } from './CreateNewWorkshopModal/CreateNewWorkshopModal';
import { CreateNewTeamModal } from './CreateNewTeamModal/CreateNewTeamModal';
import { EditTeamModal } from './EditTeamModal/EditTeamModal';

export function Modal(props) {
  const [ visibility, setVisibility ] = useState("modal fade");
  
  useEffect(() => {
	  if (props.modalVisibility){
		  setTimeout(() => {
		  	setVisibility("modal fade in");
	  	}, 100);
	  }
  }, [props.modalVisibility])
  
  function closeModal() {
	  setVisibility("modal fade");
	  setTimeout(() => {
	  	props.setModalVisibility(false);
			props.setModalTitle('');
			props.setModalComponent(null);
  	}, 500);
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

export { CollaboratorsModal, CreateNewWorkshopModal, CreateNewTeamModal, EditTeamModal }