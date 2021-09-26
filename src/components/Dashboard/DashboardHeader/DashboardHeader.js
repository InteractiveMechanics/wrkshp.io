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
					<i className="bi-chevron-down"></i> { props.currentOrg.name }
					<i className="bi-three-dots-vertical"></i>
				</div>
				<ul>
					{ orgList }
				</ul>
			</div>
		</div>
		<div className="header--group header--group--right">
			<div className="header--pill">
				<i className="bi-person-fill"></i>
				Michael
				<i className="bi-three-dots-vertical"></i>
			</div>
		</div>
	</header>
  );
}
