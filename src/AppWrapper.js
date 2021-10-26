import { useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import { useUser } from './hooks/useUser';
import { useAuth0 } from './utils/auth';
import { Me } from "./adapters/profile.js"
import { Footer } from "./components/General";
import { Login, Logout, Register, Dashboard, Workshop, Agenda } from "./pages";

export function AppWrapper() {
	let history = useHistory();
	const { state, dispatch } = useUser();
	const { isAuthenticated, loading: authLoading } = useAuth0();

	const { loading, error, data: userData } = Me({}, function(){});
	
	useEffect(() => {
		if (!loading && !authLoading && userData) {
			dispatch({
	      type: 'set',
	      user: userData.me
	    });
		}
	}, [loading, authLoading, userData])
	
	
	function triggerRedirects() {
		if (!loading && !authLoading && isAuthenticated) {
			if (isAuthenticated && state.user) {
				if (state.user.status == "registered") {
					history.push("/register");
				}
				else if (state.user.status == "deactivated") {
					history.push("/logout");
				}
			}
		}
	}
	
	
	function renderPrivateRoutes() {		
		if ((loading || authLoading) && isAuthenticated) {
			return <h1>Loading...</h1>
		} else {
			if (isAuthenticated && state.user) {
				if (state.user.status == "active") {
					return (
						<>
							<Route path="/dashboard" render={() => <Dashboard />} />
							<Switch>
								<Route path="/workshop/:id/agenda" render={() => <Agenda />} />
								<Route path="/workshop/:id" render={() => <Workshop />} />
							</Switch>
						</>
					)
				} else if (state.user.status == "registered") {
					return (
						<Route path="/register" component={() => <Register />} />
					)
				}
			}
		}
	}
					
  return (
		<>
			<Route path="/logout" component={() => <Logout />} />
			<Route path="/login" component={() => <Login />} />
			
			{ renderPrivateRoutes() }
			{ triggerRedirects() }
			<Footer />
		</>
  );
}
