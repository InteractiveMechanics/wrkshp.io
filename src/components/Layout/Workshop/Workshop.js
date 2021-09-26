import React, { useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";

import { WorkshopHeader, Agenda, WorkshopMain } from '../../Workshop';

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
	    }
	    currentPage
	    totalPages
	  }
	}
`;

export function Workshop() {
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
			workshop={data.getWorkshops.workshops[0]} />
		
		<Route exact path={path}>
			<WorkshopMain />
		</Route>
		<Route path={`${path}/agenda`}>
        	<Agenda />
        </Route>
	  </div>
	</Switch>
  );
}
