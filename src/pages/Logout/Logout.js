import { useAuth0 } from '../../../utils/auth';
import { Route, Redirect } from "react-router-dom";


export function Logout() {
	const { isAuthenticated, logout, user } = useAuth0();
  
  if (isAuthenticated) {
	  logout();
  }
  
  return (
		<Redirect to="/login" />
  );
}
