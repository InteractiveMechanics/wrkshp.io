import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";

import { GetWorkshops } from '../../adapters/workshop';
import { WorkshopHeader } from '../../components/Workshop';
import { CollaboratorsModal } from '../../components/General';
import { AgendaMain, AgendaDay } from '../../components/Agenda';

import './Agenda.css';

const page = 1;
const limit = 1;

export function Agenda() {
  const [ modalVisibility, setModalVisibility ] = useState(false);
	
  let { path, url } = useRouteMatch();
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
        
      <CollaboratorsModal 
        modalVisibility={modalVisibility}
				setModalVisibility={setModalVisibility} />
	  </div>
  );
}
