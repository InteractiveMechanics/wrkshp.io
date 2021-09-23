import React, { useState, useEffect } from 'react';
import { gql, useQuery } from "@apollo/client";

import { DashboardHeader, DashboardCard, CreateNewModal } from '../../Dashboard';

import './Dashboard.css';

const id = '';
const userId = "614354c98fd4395885f2b145";
const page = 1;
const limit = 1000;

const getOrganizationsForUser = gql`
	query getOrganizationsForUser($id: ID, $userId: ID, $page: Int, $limit: Int) {
	  getOrganizations(_id: $id, userId: $userId, page: $page, limit: $limit) {
	    organizations {
	      _id
	      name
	      users {
	        userId {
	          _id
	          avatar
	        }
	        permission
	      }
	      teams {
	        name
	        visibility
	        users {
	          userId {
	            _id
	            avatar
	          }
	          permission
	        }
	        workshops {
	          _id
	          name
	          users {
			    userId {
                  _id
                }
                permission
              }
	        }
	      }
	    }
	    currentPage
	    totalPages
	  }
	}
`;

export function Dashboard() {
  const [ modalVisibility, setModalVisibility ] = useState(false);
  const [ currentOrg, setCurrentOrg ] = useState({});
  const [ currentTeam, setCurrentTeam ] = useState({});
  
  const { loading, error, data } = useQuery(getOrganizationsForUser, 
  	{ variables: { "id": id, "userId": userId, "page": page, "limit": limit } }
  );
  
  useEffect(() => {
	if(loading === false && data){
	  setCurrentOrg(data.getOrganizations.organizations[0]);
	  setCurrentTeam(data.getOrganizations.organizations[0].teams[0]);
	}
  }, [loading, data]);
  
  if (loading) {
	return "Loading...";
  }
  if (error) {
    console.log(error);
  }
      
  return (
	<div id="dashboard">
		<DashboardHeader
			orgs={data.getOrganizations.organizations}
			currentOrg={currentOrg}
			currentTeam={currentTeam}
			
			setCurrentOrg={setCurrentOrg}
			setCurrentTeam={setCurrentTeam}
			setModalVisibility={setModalVisibility} />
			
		<DashboardCard
			currentTeam={currentTeam} />
			
		<CreateNewModal
			modalVisibility={modalVisibility}
			setModalVisibility={setModalVisibility} />
	</div>
  );
}
