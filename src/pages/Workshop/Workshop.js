import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import { GetWorkshops } from '../../adapters/workshop';
import { Modal } from '../../components/General';
import { WorkshopHeader, WorkshopMain } from '../../components/Workshop';

import './Workshop.css';

const page = 1;
const limit = 1;

export function Workshop() {
  const [ modalVisibility, setModalVisibility ] = useState(false);
  const [ modalTitle, setModalTitle ] = useState('');
  const [ modalComponent, setModalComponent ] = useState();
  
  const [ focusMode, setFocusMode ] = useState(false);
	
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
				users={data.getWorkshops.workshops[0].users}
				focusMode={focusMode}
				
				setModalVisibility={setModalVisibility}
				setModalTitle={setModalTitle}
				setModalComponent={setModalComponent} />
		
			<WorkshopMain
				workshop={data.getWorkshops.workshops[0]}
				focusMode={focusMode}
				setFocusMode={setFocusMode} />
        
			<Modal
				modalVisibility={modalVisibility}
				setModalVisibility={setModalVisibility}
				title={modalTitle}>
					{ modalComponent }
			</Modal>
	  </div>
  );
}