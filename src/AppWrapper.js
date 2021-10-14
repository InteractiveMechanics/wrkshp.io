import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { useAuth0 } from './utils/auth';
import { Footer } from "./components/General";
import { Login, Logout, Register, Dashboard, Workshop, Agenda } from "./pages";

export function AppWrapper() {
	const { isAuthenticated, logout } = useAuth0();
				
  return (
		<Router>
			<Route path="/logout" component={() => <Logout />} />
			<Route path="/login" component={() => <Login />} />
			<Route path="/register" component={() => <Register />} />
			
			{ isAuthenticated && (
				<>
					<Route path="/dashboard" render={() => <Dashboard />} />
					<Switch>
						<Route path="/workshop/:id/agenda" render={() => <Agenda />} />
						<Route path="/workshop/:id" render={() => <Workshop />} />
					</Switch>
				</>
			)}
			<Footer />
		</Router>
  );
}
