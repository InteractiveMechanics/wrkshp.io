import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import { GetWorkshops } from '../../adapters/workshop';
import { WorkshopHeader } from '../../components/Workshop';
import { Modal, CollaboratorsModal } from '../../components/General';
import { AgendaMain } from '../../components/Agenda';

import './Agenda.css';

const page = 1;
const limit = 1;

export function Agenda() {
  const [ modalVisibility, setModalVisibility ] = useState(false);
	
  let { id } = useParams();
  let variables = { "id": id, "page": page, "limit": limit };
  let onCompletedFunction = function(data){};
  const { loading, error, data } = GetWorkshops(variables, onCompletedFunction);
  
  if (loading) {
		return "Loading...";
  }
  if (error) {
    console.log(error);
  }	
    
  return (
	  <div id="workshop">
			<WorkshopHeader
				workshop={data.getWorkshops.workshops[0]}
				setModalVisibility={setModalVisibility} />
		
			<AgendaMain
				workshop={data.getWorkshops.workshops[0]} />
        
      <Modal 
        modalVisibility={modalVisibility}
				setModalVisibility={setModalVisibility}
				title="Manage Collaborators">
					<CollaboratorsModal
						users={data.getWorkshops.workshops[0].users} />
			</Modal>
	  </div>
  );
}
