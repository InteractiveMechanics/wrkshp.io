import React, { useState } from 'react';

export function DashboardHeader(props) {
  function triggerCreateModal() {
	props.setModalVisibility(true);
  }
  
  return (
	<header id="dashboard--header" className="header">
		<div className="header--group">
			<div className="header--pill">
				<div className="dashboard--header-logo">workshop.io</div>
			</div>
			<div className="header--pill">
				<i className="bi-chevron-down"></i>
				{ props.currentOrg.name }
				<i className="bi-three-dots-vertical"></i>
			</div>
			<div className="header--pill">
				<i className="bi-chevron-down"></i>
				{ props.currentTeam.name }
				<i className="bi-three-dots-vertical"></i>
			</div>
			<div className="header--pill no-padding">
				<button onClick={triggerCreateModal}><i className="bi-plus"></i> Create New Workshop</button>
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
