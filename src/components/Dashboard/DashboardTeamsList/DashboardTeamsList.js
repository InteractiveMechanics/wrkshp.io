import React, { useState } from 'react';

import { DashboardTeam } from '../../Dashboard';
import { CreateNewTeamModal, CreateNewWorkshopModal } from '../../General';
import './DashboardTeamsList.css';

export function DashboardTeamsList(props) {    	
  const organization = props.orgs[props.currentOrg];
  const teams = organization.teams;
  const currentTeam = organization.teams[props.currentTeam];
  let teamList = '';
  
  if (teams) {
		teamList = teams.map((team) => (
		  <DashboardTeam
		  	currentTeam={currentTeam}
		  	team={team}
		  	changeTeam={changeTeam}
		  	
		  	setModalVisibility={props.setModalVisibility}
				setModalTitle={props.setModalTitle}
				setModalComponent={props.setModalComponent} />
		))
  }
  
  function changeTeam(e) {
		teams.filter(
			function(team, index) { 
				if (team._id == e.target.id) {
					props.setCurrentTeam(index);
				}
			}
		);
  }
  
  function triggerCreateTeamModal() {
	  props.setModalVisibility(true);
		props.setModalTitle("Create New Team");
		props.setModalComponent(<CreateNewTeamModal
			currentOrg={props.currentOrg}
			setModalVisibility={props.setModalVisibility} />);
  }
  
  function triggerCreateWorkshopModal() {
		props.setModalVisibility(true);
		props.setModalTitle("Create New Workshop");
		props.setModalComponent(<CreateNewWorkshopModal
			currentTeam={currentTeam}
			setModalVisibility={props.setModalVisibility} />);
  }
  
  return (
		<nav>
			<button className="btn btn-primary btn-lg margin-b-3x" onClick={triggerCreateWorkshopModal}><i className="bi-plus-lg margin-r-1x"></i> Create Workshop</button>
			
			<h3 onClick={triggerCreateTeamModal}>Teams <i className="bi-plus-circle margin-l-1x"></i></h3>
			<ul className="dashboard--team-list margin-t-3x">
				{ teamList }
			</ul>
		</nav>
  );
}
