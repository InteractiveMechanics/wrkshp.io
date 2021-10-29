import { useState, useEffect } from 'react';

import { useAuth0 } from '../../utils/auth';
import { useUser } from '../../hooks/useUser';

import { GetOrganizationsForUser } from '../../adapters/dashboard';
import { Modal, CreateNewWorkshopModal, CreateNewTeamModal } from '../../components/General';
import { DashboardHeader, DashboardCardList, DashboardTeamsList } from '../../components/Dashboard';

import './Dashboard.css';

const page = 1;
const limit = 1000;

export function Dashboard(props) {
	const { state } = useUser();
	const { isAuthenticated, loading: authLoading } = useAuth0();
	
  const [ modalVisibility, setModalVisibility ] = useState(false);
  const [ modalTitle, setModalTitle ] = useState('');
  const [ modalComponent, setModalComponent ] = useState();
  
  const [ currentOrg, setCurrentOrg ] = useState(0);
  const [ currentTeam, setCurrentTeam ] = useState(0);
  
  let variables = { "userId": state.user._id, "page": page, "limit": limit };
  const { loading, error, data } = GetOrganizationsForUser(variables, function() {});
 
  
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
			setCurrentTeam={setCurrentTeam}
			setModalVisibility={setModalVisibility}
			setModalTitle={setModalTitle}
			setModalComponent={setModalComponent} />

		<main>
			<DashboardTeamsList
				orgs={data.getOrganizations.organizations}
				currentOrg={currentOrg}
				currentTeam={currentTeam}
				
				setCurrentTeam={setCurrentTeam}
				setModalVisibility={setModalVisibility}
				setModalTitle={setModalTitle}
				setModalComponent={setModalComponent} />
				
			<DashboardCardList
				orgs={data.getOrganizations.organizations}
				currentOrg={currentOrg}
				currentTeam={currentTeam}
				modalVisibility={modalVisibility}
			
				setModalVisibility={setModalVisibility}
				setModalTitle={setModalTitle}
				setModalComponent={setModalComponent} />
		</main>
		
		{ (modalVisibility) && (
			<Modal
				title={modalTitle}
				modalVisibility={modalVisibility}
				
				setModalVisibility={setModalVisibility}
				setModalTitle={setModalTitle}
				setModalComponent={setModalComponent} >
					{ modalComponent }
			</Modal>
		)}
	</div>
  );
}
