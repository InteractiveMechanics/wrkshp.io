import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { DashboardCard } from '../../Dashboard';
import { convertDate, convertTime } from '../../../utils/datetime';
import { DeleteWorkshop } from '../../../adapters/dashboard'; 
import { CreateNewWorkshopModal } from '../../General';

import './DashboardCardList.css';

export function DashboardCardList(props) {
  const currentTeam = props.orgs[props.currentOrg].teams[props.currentTeam];
  const workshops = currentTeam.workshops ? currentTeam.workshops : null;
  
  let cards = '';
  
  function triggerCreateModal() {
		props.setModalVisibility(true);
		props.setModalTitle("Create New Workshop");
		props.setModalComponent(<CreateNewWorkshopModal
			currentTeam={currentTeam}
			setModalVisibility={props.setModalVisibility} />);
  }
  
  if (workshops && workshops.length > 0) {
		cards = workshops.map((workshop) => (
			<DashboardCard 
				key={workshop._id} 
				index={workshop._id} 
				workshop={workshop} 
				setModalVisibility={props.setModalVisibility}
				setModalTitle={props.setModalTitle}
				setModalComponent={props.setModalComponent} />
			)
		)
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
