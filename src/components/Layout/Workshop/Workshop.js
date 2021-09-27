import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";

import { GetWorkshops } from '../../../adapters/workshop';
import { CollaboratorsModal } from '../../Collaborators';
import { WorkshopHeader, AgendaMain, WorkshopMain } from '../../Workshop';

import './Workshop.css';

const page = 1;
const limit = 1;

export function Workshop() {
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
	<Switch>  
	  <div id="workshop">
			<WorkshopHeader
				workshop={data.getWorkshops.workshops[0]}
				setModalVisibility={setModalVisibility} />
		
			<Route exact path={path}>
				<WorkshopMain />
			</Route>
			
			<Route path={`${path}/agenda`}>
      	<AgendaMain
      		workshop={data.getWorkshops.workshops[0]} />
			</Route>
        
      <CollaboratorsModal 
        modalVisibility={modalVisibility}
				setModalVisibility={setModalVisibility} />
	  </div>
	</Switch>
  );
}
