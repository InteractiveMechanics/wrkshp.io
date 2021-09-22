import React, { useState, useEffect } from 'react';
import { gql, useQuery } from "@apollo/client";

import { DashboardHeader, DashboardCard, CreateNewModal } from '../../Dashboard';

import './Dashboard.css';

const id = "614354c98fd4395885f2b145";
const getOrganizationsForUser = gql`
	query getOrganizationsForUser($id: ID) {
	  getOrganizationsForUser(_id: $id) {
	    _id
	    name
	    teams {
	      name
	      visibility
	      workshops {
	        _id
	        name
	      }
	    }
	  }
	}
`;

export function Dashboard() {
  const [ modalVisibility, setModalVisibility ] = useState(false);
  const [ currentOrg, setCurrentOrg ] = useState('');
  const { loading, error, data } = useQuery(getOrganizationsForUser, {
    variables: { id },
  });
  
  if (error) {
    console.log(error);
  }

  useEffect(function() {
	if (data) {
      setCurrentOrg(data.organization[0]);
    }
  }, []);
    
  return (
	<div id="dashboard">
		<DashboardHeader
			setModalVisibility={setModalVisibility}
			orgs={data}
			currentOrg={currentOrg}
			setCurrentOrg={setCurrentOrg} />
		<DashboardCard
			currentOrg={currentOrg} />
		<CreateNewModal
			modalVisibility={modalVisibility}
			setModalVisibility={setModalVisibility} />
	</div>
  );
}
