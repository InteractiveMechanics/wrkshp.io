import { useHistory } from "react-router-dom";

import { useUser } from '../../hooks/useUser';
import { useAuth0 } from '../../utils/auth';

export function Logout() {
	let history = useHistory();
	const { isAuthenticated, loading: authLoading, logout } = useAuth0();
	const { state, dispatch } = useUser();
	
  function triggerLogout() {
	  setTimeout(function() {
			if (isAuthenticated) { logout({ returnTo: window.location.origin + "/login" }) }
			history.push("/login");
	  }, 3000); 
  }
  
  return (
	  <>
	  	<h1>Logging out...</h1>
	  	{ triggerLogout() }
		</>
  )
}
