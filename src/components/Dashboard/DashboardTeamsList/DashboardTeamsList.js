import React, { useState } from 'react';

import './DashboardTeamsList.css';

export function DashboardTeamsList(props) {    
  const organization = props.currentOrg;
  const teams = organization.teams;
  const currentTeam = props.currentTeam;
  let teamList = '';
  
  if (teams) {
	teamList = teams.map((team) => (
	  <li key={ team._id } id={ team._id } className={ currentTeam._id == team._id ? "active margin-b-3x" : "margin-b-3x" } onClick={changeTeam}>
	    { team.name }
	    { currentTeam._id == team._id ? ( 
		    	<div className="settings">
		    		<i className="bi-three-dots-vertical margin-l-1x"></i>
		    		<ul className="dropdown">
							<li>Manage Collaborators</li>
							<li className="text-danger">Delete Team</li>
						</ul>
		    	</div> 
		    ) : "" 
		  }
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
		<button className="btn btn-primary btn-lg margin-b-3x" onClick={triggerCreateModal}><i className="bi-plus-lg margin-r-1x"></i> Create New Workshop</button>
		
		<h3>TEAMS</h3>
		<ul className="dashboard--team-list margin-t-3x">
			{ teamList }
		</ul>
	</nav>
  );
}
