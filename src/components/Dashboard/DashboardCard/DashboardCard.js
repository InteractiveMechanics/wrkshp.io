import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './DashboardCard.css';

export function DashboardCard(props) {
  const currentTeam = props.currentTeam;
  const workshops = currentTeam.workshops ? currentTeam.workshops : null;
  
  let cards = '';
  
  if (workshops) {
	cards = workshops.map((workshop) => (
	  <div key={ workshop._id } id={ workshop._id } className="dashboard--card">
		<div className="dashboard--card--image-wrapper"></div>
		<div className="dashboard--card--content">
			<div>
				<h2>{ workshop.name }</h2>
				<i className="bi-three-dots-vertical"></i>
			</div>
			<div><i className="bi-calendar"></i><span>Jan. 1–3, 2022</span></div>
			<div><i className="bi-clock"></i><span>12 Hours</span></div>
			<div><i className="bi-people-fill"></i><span>{ workshop.users.length } { workshop.users.length > 1 ? "Collaborators" : "Collaborator" }</span></div>
			<div className="button-group">
				<Link className="button strong" to={ "/workshop/" + workshop._id }>Start Workshop</Link>
				<Link className="button simple" to={ "/workshop/" + workshop._id + "/agenda" }>Edit</Link>
			</div>
		</div>
	  </div>
	))
  }
  
  return (
	<div className="dashboard--card-list">
		{ cards }
	</div>
  );
}
