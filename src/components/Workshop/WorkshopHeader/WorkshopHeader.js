import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { CollaboratorsModal } from '../../../components/General';

export function WorkshopHeader(props) {
	const focusMode = props.focusMode;
  const workshop = props.workshop;
  
  function triggerCreateModal() {
		props.setModalVisibility(true);
		props.setModalTitle("Manage Collaborators");
		props.setModalComponent(<CollaboratorsModal
			setModalVisibility={props.setModalVisibility}
			users={props.users} />)
  }
  	
  return (
		<header id="workshop--header" className="header">
			{ focusMode ? (
				<div className="header--group">
					<Link to={ "/workshop" + workshop._id }>
						<div className="header--pill square">
							<i className="bi-x-lg"></i>
						</div>
					</Link>
					<div className="header--pill">
						ACTIVITY NAME
					</div>
					<div className="header--pill">
						<i className="bi-clock margin-r-1x"></i>
						TIMER
					</div>
				</div>
			) : (
				<div className="header--group">
					<Link to="/dashboard">
						<div className="header--pill square">
							<i className="bi-chevron-left"></i>
						</div>
					</Link>
					<div className="header--pill-wrapper">
						<div className="header--pill">
							{ workshop.name }
							<i className="bi-three-dots-vertical margin-l-1x"></i>
						</div>
						<ul className="dropdown right">
							<li>Edit Workshop</li>
						</ul>
					</div>
					<Link to={ "/workshop/" + workshop._id + "/agenda" }>
						<div className="header--pill square">
							<i className="bi-calendar4-range"></i>
						</div>
					</Link>
					
					{ workshop.status == "not-started" ? (
						<Link to={ "/workshop/" + workshop._id }>
							<div className="header--pill">
								<i className="bi-ui-checks-grid"></i> Start Workshop
							</div>
						</Link>
					) : (
						<Link to={ "/workshop/" + workshop._id }>
							<div className="header--pill square">
								<i className="bi-ui-checks-grid"></i>
							</div>
						</Link>
					)}
				</div>
			)}
	
			<div className="header--group header--group--right">
				<div className="header--pill" onClick={triggerCreateModal}>
					<i className="bi-person-plus margin-r-1x"></i>
					Share
				</div>
				<div className="header--pill square">
					<i className="bi-question-circle"></i>
				</div>
			</div>
		</header>
  );
}