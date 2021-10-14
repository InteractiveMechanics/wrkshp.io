import { useEffect } from "react";
import { useAuth0 } from '../../utils/auth';

export function Logout() {
	const { isAuthenticated, logout } = useAuth0();
  
  useEffect(() => {
	  if (isAuthenticated) logout({ returnTo: window.location.origin + "/login" });
  }, [])
  
  return (
	  <></>
  );
}
