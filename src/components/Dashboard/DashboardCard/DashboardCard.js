import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './DashboardCard.css';

export function DashboardCard(props) {
  const currentOrg = props.currentOrg;
  
  return (
	<main>
		<div className="dashboard--card">
			<div className="dashboard--card--image-wrapper"></div>
			<div className="dashboard--card--content">
				<div>
					<h2>{ props.name }</h2>
					<i className="bi-three-dots-vertical"></i>
				</div>
				<div><i className="bi-calendar"></i><span>Jan. 1–3, 2022</span></div>
				<div><i className="bi-clock"></i><span>12 Hours</span></div>
				<div><i className="bi-people-fill"></i><span>13 Collaborators</span></div>
				<div className="button-group">
					<Link className="button strong" to="/workshop/1">Start Workshop</Link>
					<Link className="button simple" to="/workshop/1/agenda">Edit</Link>
				</div>
			</div>
		</div>
	</main>
  );
}
