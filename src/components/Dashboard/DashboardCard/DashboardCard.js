import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { convertDate, convertTime } from '../../../utils/datetime';

import './DashboardCard.css';

export function DashboardCard(props) {
  const currentTeam = props.currentTeam;
  const workshops = currentTeam.workshops ? currentTeam.workshops : null;
  
  let cards = '';
  
  function buildDurationString(minutes) {
	  if (minutes >= 60) {
		  return (Math.round((minutes/60) * 100) / 100) + " Hours";
	  } else {
		  return minutes + " Minutes";
	  }
  }
  
  function triggerCreateModal() {
		props.setModalVisibility(true);
  }
  
  if (workshops && workshops.length > 0) {
		cards = workshops.map((workshop) => {
			let dateString;
			let duration = 0;
			let durationString;
			
			if (workshop.agenda) {
				const startDate = convertDate(workshop.agenda[0].startTime);
				const endDate = convertDate(workshop.agenda[workshop.agenda.length - 1].startTime);
				
				if (startDate == endDate) {
					dateString = startDate;
				} else {
					dateString = startDate + " - " + endDate;
				}
				
				workshop.agenda.forEach((agenda, index) => {
					if (agenda.activities) {
						agenda.activities.forEach((activity, index) => {
							duration += activity.duration;
						})
					}
				})
				
				durationString = buildDurationString(duration);
			}
			
			return (
			  <div key={ workshop._id } id={ workshop._id } className="dashboard--card">
					<div className="dashboard--card--image-wrapper">
						<div className="settings">
							<button className="btn btn-icon"><i className="bi-three-dots-vertical"></i></button>
							<ul className="dropdown right">
								<li>Share</li>
								<li>Archive</li>
								<li className="text-danger">Delete</li>
							</ul>
						</div>
					</div>
					
					<div className="dashboard--card--content">
						<div className="dashboard--card--header margin-b-2x">
							<h4>{ workshop.name }</h4>
						</div>
						<div className="dashboard--card--metadata margin-b-1x text-muted"><i className="bi-calendar margin-r-1x"></i><span>{ dateString }</span></div>
						<div className="dashboard--card--metadata margin-b-1x text-muted"><i className="bi-clock margin-r-1x"></i><span>{ durationString }</span></div>
						<div className="dashboard--card--metadata text-muted"><i className="bi-people-fill margin-r-1x"></i>
							<span>{ workshop.users.length } { workshop.users.length > 1 ? "Collaborators" : "Collaborator" }</span>
						</div>
						<div className="button-group margin-t-3x">
							<Link className="btn btn-sm btn-outline-primary" to={ "/workshop/" + workshop._id }>Start Workshop</Link>
							<Link className="btn btn-sm btn-outline-secondary" to={ "/workshop/" + workshop._id + "/agenda" }>Edit Agenda</Link>
						</div>
					</div>
			  </div>
			)
		})
  } else {	  
	  cards = (
		  <div className="dashboard--card empty" onClick={triggerCreateModal}>
				<i className="bi-plus-circle-dotted margin-b-2x"></i>
				<h2>Create a workshop!</h2>
		  </div>
		)
  }
  
  return (
	<div className="dashboard--card-list">
		{ cards }
	</div>
  );
}
