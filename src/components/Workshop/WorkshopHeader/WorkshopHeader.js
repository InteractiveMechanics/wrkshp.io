import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function WorkshopHeader(props) {
  const workshop = props.workshop;
  
  function triggerCreateModal() {
		props.setModalVisibility(true);
  }
  	
  return (
	<header id="workshop--header" className="header">
		<div className="header--group">
			<div className="header--pill square">
				<Link to="/dashboard"><i className="bi-chevron-left"></i></Link>
			</div>
			<div className="header--pill">
				{ workshop.name }
				<i className="bi-three-dots-vertical margin-l-1x"></i>
			</div>
			<div className="header--pill">
				<Link to={ "/workshop/" + workshop._id }><i className="bi-ui-checks-grid"></i> Workshop</Link>
				<Link to={ "/workshop/" + workshop._id + "/agenda" }><i className="bi-calendar4-range"></i> Agenda</Link>
			</div>
		</div>

		<div className="header--group header--group--right">
			<div className="header--pill" onClick={triggerCreateModal}>
				<i className="bi-person-plus margin-r-1x"></i>
				Collaborators
			</div>
			<div className="header--pill square">
				<i className="bi-question-circle"></i>
			</div>
		</div>
	</header>
  );
}