import React, { useState } from 'react';

import { DashboardTeam } from '../../Dashboard';
import './DashboardTeamsList.css';

export function DashboardTeamsList(props) {    	
  const organization = props.currentOrg;
  const teams = organization.teams;
  const currentTeam = props.currentTeam;
  let teamList = '';
  
  if (teams) {
		teamList = teams.map((team) => (
		  <DashboardTeam
		  	currentTeam={currentTeam}
		  	team={team}
		  	changeTeam={changeTeam} />
		))
  }
  
  function changeTeam(e) {
		teams.filter(
			function(team, index) { 
				if (team._id == e.target.id) {
					props.setCurrentTeam(teams[index]);
				}
			}
		);
  }
  
  function addNewTeam(e) {
	  
  }
  
  function triggerCreateWorkshopModal() {
		props.setModalVisibility(true);
  }
  
  return (
		<nav>
			<button className="btn btn-primary btn-lg margin-b-3x" onClick={triggerCreateWorkshopModal}><i className="bi-plus-lg margin-r-1x"></i> Create Workshop</button>
			
			<h3 onClick={addNewTeam}>Teams <i className="bi-plus-circle margin-l-1x"></i></h3>
			<ul className="dashboard--team-list margin-t-3x">
				{ teamList }
			</ul>
		</nav>
  );
}
