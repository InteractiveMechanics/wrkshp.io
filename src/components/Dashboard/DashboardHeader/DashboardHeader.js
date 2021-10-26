import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { getPermsForObj } from '../../../utils/permissions';

import { useAuth0 } from '../../../utils/auth';
import { useAvatar } from '../../../hooks/useAvatar';
import { useUser } from '../../../hooks/useUser';

export function DashboardHeader(props) {
	let history = useHistory();
	const { isAuthenticated, logout, user } = useAuth0();
	const { state } = useUser();
	
  const orgs = props.orgs;
  const currentOrg = props.currentOrg;
  const currentOrgAvatar = useAvatar(currentOrg.avatar, currentOrg.name);
	const currentOrgPerms = getPermsForObj(state.user._id, currentOrg);
	const userAvatar = useAvatar(state.user.avatar, state.user.firstName + " " + state.user.lastName);

  let orgList = '';
  
  if (orgs) {
		orgList = orgs.map((org) => (
		  <li key={ org._id } id={ org._id } className={ org } onClick={changeOrg}>
		    { org.name }
		  </li>
		))
  }
  
  function changeOrg(e) {
		orgs.filter(
			function(org, index) { 
				if (org._id == e.target.id) {
					props.setCurrentOrg(orgs[index]);
					props.setCurrentTeam(orgs[index].teams[0]);
				}
			}
		);
  }
  
  function handleLogout() {
	  if (isAuthenticated) { logout({ returnTo: window.location.origin + "/login" }) }
		history.push("/login");
  }
        
  return (
		<header id="dashboard--header" className="header">
			<div className="header--group">
				<div className="header--pill-wrapper header--org-selector">
					<div className="header--pill">
						<i className="bi-three-dots-vertical margin-r-1x"></i>
						<i className="avatar">{ currentOrgAvatar }</i>
						{ props.currentOrg.name }
					</div>
					<ul className="dropdown">
						<li className="dropdown--header"><h5>Switch organization</h5></li>
						{ orgList }
						<li className="dropdown--divider"></li>
						{ (currentOrgPerms == "owner" || "manager") && (<li><i className="bi-person-plus-fill margin-r-1x"></i> Invite collaborators</li>) }
						{ (currentOrgPerms == "owner") && (<li><i className="bi-gear-fill margin-r-1x"></i> Manage organization</li>) }
					</ul>
				</div>
			</div>
			<div className="header--group header--group--right">
				<div className="header--pill-wrapper">
					<div className="header--pill">
						<i className="avatar">{ userAvatar }</i>
						{ state.user.firstName }
						<i className="bi-three-dots-vertical margin-l-1x"></i>
					</div>
					<ul className="dropdown right">
						<li>My Account</li>
						<li onClick={handleLogout}>Logout</li>
					</ul>
				</div>
			</div>
		</header>
  );
}
