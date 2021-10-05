import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { convertDate, convertTime } from '../../../utils/datetime';
import { DeleteWorkshop } from '../../../adapters/dashboard'; 

import './DashboardCard.css';

export function DashboardCard(props) {
	const workshop = props.workshop;
	
	let dateString;
	let duration = 0;
	let durationString;
	let cardButtons;
	
	let deleteWorkshopVariables = { _id: workshop._id }
	const [deleteWorkshop, { data, loading, error }] = DeleteWorkshop(deleteWorkshopVariables, function() {});
	
	function buildDurationString(minutes) {
	  if (minutes >= 60) {
		  return (Math.round((minutes/60) * 100) / 100) + " Hours";
	  } else {
		  return minutes + " Minutes";
	  }
  }
	
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
	
	if (workshop.status == "not-started") {
		cardButtons = (
			<div className="button-group margin-t-3x">
				<Link className="btn btn-sm btn-outline-primary" to={ "/workshop/" + workshop._id }>Start Workshop</Link>
				<Link className="btn btn-sm btn-outline-secondary" to={ "/workshop/" + workshop._id + "/agenda" }>Edit Agenda</Link>
			</div>
		)
	} else if (workshop.status == "in-progress") {
		cardButtons = (
			<div className="button-group margin-t-3x">
				<Link className="btn btn-sm btn-outline-primary" to={ "/workshop/" + workshop._id }>Join Workshop</Link>
			</div>
		)
	}
	
	return (
	  <div key={ workshop._id } id={ workshop._id } className="dashboard--card">
			<div className="dashboard--card--image-wrapper">
				<div className="settings">
					<button className="btn btn-icon"><i className="bi-three-dots-vertical"></i></button>
					<ul className="dropdown right">
						<li>Share</li>
						<li>Archive</li>
						<li className="text-danger" onClick={deleteWorkshop}>Delete</li>
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
				
				{ cardButtons }
				
			</div>
	  </div>
	)
}