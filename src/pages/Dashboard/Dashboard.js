import { useState, useEffect } from 'react';

import { useAuth0 } from '../../utils/auth';
import { useUser } from '../../hooks/useUser';

import { GetOrganizationsForUser } from '../../adapters/dashboard';
import { Modal, CreateNewWorkshopModal } from '../../components/General';
import { DashboardHeader, DashboardCardList, DashboardTeamsList } from '../../components/Dashboard';

import './Dashboard.css';

const page = 1;
const limit = 1000;

export function Dashboard(props) {
	const { state } = useUser();
	const { isAuthenticated, loading: authLoading } = useAuth0();
	
  const [ modalVisibility, setModalVisibility ] = useState(false);
  const [ currentOrg, setCurrentOrg ] = useState({});
  const [ currentTeam, setCurrentTeam ] = useState({});
  
  let variables = { "userId": state.user._id, "page": page, "limit": limit };
  const { loading, error, data } = GetOrganizationsForUser(variables, function() {});
  
  useEffect(() => {
		if(loading === false && authLoading === false && data){			
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
		
		<Modal
			modalVisibility={modalVisibility}
			setModalVisibility={setModalVisibility}
			title="Create New Workshop">
				<CreateNewWorkshopModal
					currentTeam={currentTeam}
					setModalVisibility={setModalVisibility} />
		</Modal>
	</div>
  );
}
