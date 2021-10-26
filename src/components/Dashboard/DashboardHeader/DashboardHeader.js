import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { useAuth0 } from '../../../utils/auth';
import { useUser } from '../../../hooks/useUser';

export function DashboardHeader(props) {
	let history = useHistory();
	const { isAuthenticated, logout, user } = useAuth0();
	const { state } = useUser();
	
  const orgs = props.orgs;
  const currentOrg = props.currentOrg;
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
				<div className="header--pill">
					<div className="dashboard--header-logo">workshop.io</div>
				</div>
				<div className="header--pill-wrapper">
					<div className="header--pill">
						<i className="bi-chevron-down margin-r-1x"></i>
						{ props.currentOrg.name }
					</div>
					<ul className="dropdown">
						{ orgList }
					</ul>
				</div>
				<div className="header--pill">
					<i className="bi-gear margin-r-1x"></i>
					Manage Organization
				</div>
			</div>
			<div className="header--group header--group--right">
				<div className="header--pill-wrapper">
					<div className="header--pill">
						<i className="bi-person-fill margin-r-1x"></i>
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
