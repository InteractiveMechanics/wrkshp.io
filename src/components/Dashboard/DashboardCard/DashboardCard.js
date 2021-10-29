import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { CollaboratorsModal } from '../../../components/General';

import { useUser } from '../../../hooks/useUser';

import { convertDate, convertTime } from '../../../utils/datetime';
import { DeleteWorkshop } from '../../../adapters/dashboard'; 
import { getPermsForObj } from '../../../utils/permissions';

import './DashboardCard.css';

export function DashboardCard(props) {
	const { state } = useUser();
	
	const workshop = props.workshop;
	
	let dateString;
	let duration = 0;
	let durationString;
	let cardButtons;
	
	let deleteWorkshopVariables = { _id: workshop._id }
	const [deleteWorkshop, { data, loading, error }] = DeleteWorkshop(deleteWorkshopVariables, function() {});
	
	const currentWorkshopPerms = getPermsForObj(state.user._id, workshop);
	
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
	
	function triggerCreateModal() {
		props.setModalVisibility(true);
		props.setModalTitle("Manage Collaborators");
		props.setModalComponent(<CollaboratorsModal
			setModalVisibility={props.setModalVisibility}
			users={workshop.users} />)
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
				{(currentWorkshopPerms == "facilitator" || "owner") && (
					<div className="settings">
						<button className="btn btn-icon"><i className="bi-three-dots-vertical"></i></button>
						<ul className="dropdown right">
							<li onClick={triggerCreateModal}>Share</li>
							<li>Copy Agenda</li>
							<li className="text-danger" onClick={deleteWorkshop}>Delete</li>
						</ul>
					</div>
				)}
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