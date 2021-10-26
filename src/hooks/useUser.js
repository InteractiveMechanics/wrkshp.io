import React, { createContext, useContext, useReducer } from "react";

const UserContext = React.createContext();

const UserReducer = (state, action) => {
	switch (action.type) {
		case "set": {
			return {user: action.user}
		}
		case "clear": {
			return {user: null}
		}
		default: {
			return state;
		}
	}
}

const UserProvider = ({ user, children }) => {
	const [state, dispatch] = React.useReducer(UserReducer, {user: null});
	const value = {state, dispatch};
	
	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	)
}

const useUser = () => {
  const context = React.useContext(UserContext)

  return context
}

export { UserProvider, useUser }
