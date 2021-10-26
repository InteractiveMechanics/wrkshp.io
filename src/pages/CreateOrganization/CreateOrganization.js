import React from 'react';

import './Register.css';

export function Register() {  
  return (
		<main>
			<div className="fullscreen-card centered">
				<div className="fullscreen-card--header">
					<h2>Welcome to Workshop.io</h2>
				</div>
				<div className="fullscreen-card--body">
					<p>Congratulations! You’ve taken the first step towards organizing and hosting better workshops with your teams and clients. To get started, you’ll need to create a new organization.</p>
					<fieldset className="margin-b-2x">
			  		<label htmlFor="name" className="required">Organization Name</label>
			  		<input id="name" type="text" />
			  	</fieldset>
			  	<fieldset className="margin-b-2x">
			  		<label htmlFor="name" className="required">Organization Logo</label>
			  		<input id="name" type="text" />
			  	</fieldset>
					<div className="button-group right">
						<a className="btn btn-primary">Continue</a>
					</div>
				</div>
				<div className="fullscreen-card--body">
					<p><strong>Not looking to create a new organization?</strong> Ask a collaborator to invite you to their team instead.</p>
				</div>
			</div>
		</main>
  );
}
