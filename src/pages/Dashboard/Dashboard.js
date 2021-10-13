import { useState, useEffect } from 'react';

import { GetOrganizationsForUser } from '../../adapters/dashboard';
import { DashboardHeader, DashboardCardList, DashboardTeamsList, CreateNewModal } from '../../components/Dashboard';
import { useAuth0 } from '../../utils/auth';

import './Dashboard.css';

const page = 1;
const limit = 1000;

export function Dashboard() {
  const [ modalVisibility, setModalVisibility ] = useState(false);
  const [ currentOrg, setCurrentOrg ] = useState({});
  const [ currentTeam, setCurrentTeam ] = useState({});
  
  let variables = { "page": page, "limit": limit };
  const { loading, error, data } = GetOrganizationsForUser(variables, function() {});
  const { isAuthenticated, loading: authLoading, loginWithRedirect, loginWithPopup, logout, user } = useAuth0();
  
  useEffect(() => {
		if(loading === false && data){			
			setCurrentOrg(data.getOrganizations.organizations[0]);
		  setCurrentTeam(data.getOrganizations.organizations[0].teams[0]);
		}
  }, [loading, data]);
  
  if (loading || authLoading) {
		return "Loading...";
  }
  if (error) {
    return String(error);
  }
      
  return (
	<div id="dashboard">
		<DashboardHeader
			orgs={data.getOrganizations.organizations}
			currentOrg={currentOrg}
			currentTeam={currentTeam}
			
			setCurrentOrg={setCurrentOrg}
			setCurrentTeam={setCurrentTeam} />
			

		<main>
			<DashboardTeamsList
				currentOrg={currentOrg}
				currentTeam={currentTeam}
				
				setCurrentTeam={setCurrentTeam}
				setModalVisibility={setModalVisibility} />
				
			<DashboardCardList
				currentTeam={currentTeam}
				modalVisibility={modalVisibility}
			
				setModalVisibility={setModalVisibility} />
		</main>
		
		<CreateNewModal
			currentTeam={currentTeam}
			modalVisibility={modalVisibility}
			
			setModalVisibility={setModalVisibility} />
	</div>
  );
}
