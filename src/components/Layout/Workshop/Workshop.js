import React, { useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";

import { CollaboratorsModal } from '../../Collaborators';
import { WorkshopHeader, AgendaMain, WorkshopMain } from '../../Workshop';

import './Workshop.css';

const page = 1;
const limit = 1;

const getWorkshops = gql`
	query getWorkshops($id: ID, $page: Int, $limit: Int) {
	  getWorkshops(_id: $id, page: $page, limit: $limit) {
	    workshops {
	      _id
	      name
	      users {
	        userId {
	          _id
	          avatar
	          firstName
	        }
	        permission
	      }
	      agenda {
		      _id
		      weight
		      startTime
		      activities {
			      _id
			      weight
			      duration
			      activity {
				      _id
				      name
				      type
				      description
				      suggestedDuration
				    }
			    }
		    }
	    }
	    currentPage
	    totalPages
	  }
	}
`;

export function Workshop() {
  const [ modalVisibility, setModalVisibility ] = useState(false);
	
  let { path, url } = useRouteMatch();
  let { id } = useParams();
    
  const { loading, error, data } = useQuery(getWorkshops, 
  	{ variables: { "_id": id, "page": page, "limit": limit } }
  );
  
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
