import { useState, useEffect } from 'react';
import { usePrevious } from '../../utils/usePrevious';

import { GetOrganizationsForUser } from '../../adapters/dashboard';
import { DashboardHeader, DashboardCard, DashboardTeamsList, CreateNewModal } from '../../components/Dashboard';

import './Dashboard.css';

const id = '';
const userId = "614354c98fd4395885f2b145";
const page = 1;
const limit = 1000;

export function Dashboard() {
  const [ modalVisibility, setModalVisibility ] = useState(false);
  const [ currentOrg, setCurrentOrg ] = useState({});
  const [ currentTeam, setCurrentTeam ] = useState({});
  
  const prevOrg = usePrevious(currentOrg);
  const prevTeam = usePrevious(currentTeam);
  
  let variables = { "id": id, "userId": userId, "page": page, "limit": limit };
  const { loading, error, data } = GetOrganizationsForUser(variables, function() {});
  
  console.log(prevTeam);
  
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
			setCurrentTeam={setCurrentTeam} />
			
		<main>
			<DashboardTeamsList
				currentOrg={currentOrg}
				currentTeam={currentTeam}
				
				setCurrentTeam={setCurrentTeam}
				setModalVisibility={setModalVisibility} />
				
			<DashboardCard
				currentTeam={currentTeam} />
		</main>
			
		<CreateNewModal
			currentTeam={currentTeam}
			modalVisibility={modalVisibility}
			
			setModalVisibility={setModalVisibility} />
	</div>
  );
}
