import React from 'react';
import { useAuth0 } from '../../utils/auth';

import './Login.css';

export function Login() {  
	const { isAuthenticated, loading: authLoading, loginWithRedirect, loginWithPopup, logout, user } = useAuth0();

  return (
		<main>
			<h1>Login</h1>
			{ !isAuthenticated && (<button onClick={loginWithPopup}>Login</button>) }
		</main>
  );
}
