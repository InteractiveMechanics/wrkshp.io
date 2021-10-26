import React from 'react';
import { useHistory } from "react-router-dom";

import { useUser } from '../../hooks/useUser';
import { useAuth0 } from '../../utils/auth';
import { UpdateUser } from "../../adapters/register.js"

import './Register.css';

export function Register() {
	const history = useHistory();
	const { state, dispatch } = useUser();
	const { isAuthenticated, loading: authLoading, user } = useAuth0();
	
	let UpdateUserVariables = {
		_id: state.user._id,
		email: user.email,
		firstName: user.given_name,
		lastName: user.family_name,
		avatar: user.picture,
		status: "active"
	}
  const [updateUser, { data, loading, error }] = UpdateUser(UpdateUserVariables, () => { history.push("/dashboard") });
  
  
  function handleUserUpdate() {
	  updateUser();
  }
  
	
	if (isAuthenticated && authLoading) {
		return <h1>Loading...</h1>;
	}
	
  return (
		<main>
			<div className="fullscreen-card centered">
				<div className="fullscreen-card--header">
					<h2>Welcome to Workshop.io</h2>
				</div>
				<div className="fullscreen-card--body">
					<p>{`Help your teammates better identify and collaborate with you on Workshop.io by telling us a bit more about you.`}</p>
					<fieldset className="margin-b-2x">
			  		<label htmlFor="name" className="required">First Name</label>
			  		<input id="name" type="text" value={user.given_name} />
			  	</fieldset>
			  	<fieldset className="margin-b-2x">
			  		<label htmlFor="name" className="required">Last Name</label>
			  		<input id="name" type="text" value={user.family_name} />
			  	</fieldset>
			  	<fieldset className="margin-b-2x">
			  		<label htmlFor="name" className="required">Email</label>
			  		<input id="name" type="email" value={user.email} disabled="disabled" />
			  	</fieldset>
			  	<fieldset className="margin-b-2x">
			  		<label htmlFor="name" className="required">Avatar</label>
			  		<input id="name" type="text" value={user.picture} />
			  	</fieldset>
					<div className="button-group right">
						<a className="btn btn-primary" onClick={handleUserUpdate}>Continue</a>
					</div>
				</div>
			</div>
		</main>
  );
}
