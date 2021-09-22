import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function WorkshopHeader() {  
  return (
	<header id="workshop--header" className="header">
		<div className="header--group">
			<div className="header--pill">
				<Link to="/dashboard"><i className="bi-chevron-left"></i></Link>
				Workshop Title
				<i className="bi-three-dots-vertical"></i>
			</div>
		</div>

		<div className="header--group header--group--right">
			<div className="header--pill">
				<i className="bi-person-plus"></i>
				Collaborators
			</div>
			<div className="header--pill">
				<i className="bi-question-circle"></i>
			</div>
		</div>
	</header>
  );
}