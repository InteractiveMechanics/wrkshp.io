import React, { useState } from 'react';

import { CollaboratorsModal, EditTeamModal } from '../../../components/General';

import { getPermsForObj } from '../../../utils/permissions';
import { useUser } from '../../../hooks/useUser';
import { DeleteTeam } from '../../../adapters/dashboard';

export function DashboardTeam(props) {  
	const { state } = useUser();
	  
  const team = props.team;
	const currentTeam = props.currentTeam;
	
	const currentTeamPerms = getPermsForObj(state.user._id, team);
	
	let deleteTeamVariables = { _id: team._id }
	const [deleteTeam, { data, loading, error }] = DeleteTeam(deleteTeamVariables, function() {});
	
	
	function triggerEditModal() {
		props.setModalVisibility(true);
		props.setModalTitle("Edit Team");
		props.setModalComponent(<EditTeamModal
			setModalVisibility={props.setModalVisibility}
			team={team} />)
	}
	
	function triggerCollaboratorsModal() {
		props.setModalVisibility(true);
		props.setModalTitle("Manage Collaborators");
		props.setModalComponent(<CollaboratorsModal
			setModalVisibility={props.setModalVisibility}
			users={team.users} />)
  }

  return (currentTeamPerms || team.visibility == "public") && (
		<li key={ team._id } id={ team._id } className={ currentTeam._id == team._id ? "active margin-b-3x" : "margin-b-3x" } onClick={props.changeTeam}>
	    { team.name }
	    { ((currentTeam._id == team._id) && (currentTeamPerms == "owner" || "manager")) && (
	    	<div className="settings">
	    		<i className="bi-three-dots-vertical margin-l-1x"></i>
	    		<ul className="dropdown">
	    			<li onClick={triggerEditModal}>Edit Team</li>
						<li onClick={triggerCollaboratorsModal}>Manage Collaborators</li>
						<li className="text-danger" onClick={deleteTeam}>Delete Team</li>
					</ul>
	    	</div> 
		  )}
	  </li>
	)
}
