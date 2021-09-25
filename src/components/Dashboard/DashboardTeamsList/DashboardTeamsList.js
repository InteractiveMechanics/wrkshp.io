import React, { useState } from 'react';

import './DashboardTeamsList.css';

export function DashboardTeamsList(props) {    
  const organization = props.currentOrg;
  const teams = organization.teams;
  const currentTeam = props.currentTeam;
  let teamList = '';
  
  if (teams) {
	teamList = teams.map((team) => (
	  <li key={ team._id } id={ team._id } className={ currentTeam._id == team._id ? "active" : "" } onClick={changeTeam}>
	    { team.name }
	  </li>
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
  
  function triggerCreateModal() {
	props.setModalVisibility(true);
  }
  
  return (
	<nav>
		<button className="btn btn-primary btn-lg" onClick={triggerCreateModal}><i className="bi-plus"></i> Create New Workshop</button>
		
		<h3>TEAMS</h3>
		<ul className="dashboard--team-list">
			{ teamList }
		</ul>
	</nav>
  );
}
