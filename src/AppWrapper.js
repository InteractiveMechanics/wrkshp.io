import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Footer } from "./components/General";
import { Login, Register, Dashboard, Workshop, Agenda } from "./pages";

export function AppWrapper() {
  return (
		<Router>
			<Route path="/login" component={() => <Login />} />
			<Route path="/register" component={() => <Register />} />
			<Route path="/dashboard" render={() => <Dashboard />} />
			<Switch>
				<Route path="/workshop/:id/agenda" render={() => <Agenda />} />
				<Route path="/workshop/:id" render={() => <Workshop />} />
			</Switch>
			<Footer />
		</Router>
  );
}
