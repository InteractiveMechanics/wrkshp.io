import React, { useState } from 'react';

export function DashboardHeader(props) {
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
					
					console.log(currentOrg);
				}
			}
		);
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
				<ul>
					{ orgList }
				</ul>
			</div>
			<div className="header--pill">
				<i className="bi-gear margin-r-1x"></i>
				Manage Organization
			</div>
		</div>
		<div className="header--group header--group--right">
			<div className="header--pill">
				<i className="bi-person-fill margin-r-1x"></i>
				Michael
				<i className="bi-three-dots-vertical margin-l-1x"></i>
			</div>
		</div>
	</header>
  );
}
