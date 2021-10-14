import { useState, useEffect } from 'react';
import { useAuth0 } from '../../utils/auth';

import { GetOrganizationsForUser } from '../../adapters/dashboard';
import { DashboardHeader, DashboardCardList, DashboardTeamsList, CreateNewModal } from '../../components/Dashboard';

import './Dashboard.css';

const page = 1;
const limit = 1000;

export function Dashboard(props) {
	const { isAuthenticated, loading: authLoading } = useAuth0();
	
  const [ modalVisibility, setModalVisibility ] = useState(false);
  const [ currentOrg, setCurrentOrg ] = useState({});
  const [ currentTeam, setCurrentTeam ] = useState({});
  
  let variables = { "page": page, "limit": limit };
  const { loading, error, data } = GetOrganizationsForUser(variables, function() {});
  
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
			activeUser={props.activeUser}
			
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
