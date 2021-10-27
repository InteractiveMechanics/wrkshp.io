import React, { useState } from 'react';

import { getPermsForObj } from '../../../utils/permissions';
import { useUser } from '../../../hooks/useUser';

export function DashboardTeam(props) {  
	const { state } = useUser();
	  
  const team = props.team;
	const currentTeam = props.currentTeam;
	
	const currentTeamPerms = getPermsForObj(state.user._id, team);

  return (currentTeamPerms || team.visibility == "public") && (
		<li key={ team._id } id={ team._id } className={ currentTeam._id == team._id ? "active margin-b-3x" : "margin-b-3x" } onClick={props.changeTeam}>
	    { team.name }
	    { ((currentTeam._id == team._id) && (currentTeamPerms == "owner" || "manager")) && (
	    	<div className="settings">
	    		<i className="bi-three-dots-vertical margin-l-1x"></i>
	    		<ul className="dropdown">
	    			<li>Edit Team</li>
						<li>Manage Collaborators</li>
						<li className="text-danger">Delete Team</li>
					</ul>
	    	</div> 
		  )}
	  </li>
	)
}
