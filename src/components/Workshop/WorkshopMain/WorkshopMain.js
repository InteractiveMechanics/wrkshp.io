import React, { useState, useEffect } from 'react';

import { convertDate, convertTime, compareTimeToNow } from '../../../utils/datetime.js';
import { UpdateWorkshop } from '../../../adapters/workshop';
import { BoardList } from '../../Workshop';

import './WorkshopMain.css';

export function WorkshopMain(props) {
	const workshop = props.workshop;
	const compareTime = compareTimeToNow(workshop.agenda[0].startTime);
	
	const [status, setStatus] = useState(workshop.status);
	
	let updateWorkshopVariables = { _id: workshop._id, status: status }
	const [updateWorkshop, { data, loading, error }] = UpdateWorkshop(updateWorkshopVariables, function() {});
	
	
	useEffect(() => {
		updateWorkshop();
	}, [status]);
	
	
	function startWorkshop() {
		setStatus("in-progress");
	}
	
  return (
	  <div className="workshop--wrapper">
		  { status == "not-started" ? (
				<div className="start-workshop">
					<h1>{workshop.name}</h1>
					{ compareTime ? 
						(<p>This workshop is scheduled to start on { compareTime }.</p> ) : 
						(<p>This workshop was scheduled for { convertDate(workshop.agenda[0].startTime) } at { convertTime(workshop.agenda[0].startTime) }.</p> ) 
					}
					
					<button className="btn btn-primary btn-lg" onClick={startWorkshop}>Start Workshop</button>
				</div>
			) : null }
			
			{ status == "in-progress" ? (				
				<BoardList
					activities={workshop.agenda[0].activities} />
			) : null }
		</div>
  );
}
