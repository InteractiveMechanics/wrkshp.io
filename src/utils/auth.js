import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({ 
	children, 
	onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
	...initOptions 
}) => {
	const [ isAuthenticated, setIsAuthenticated ] = useState();
	const [ user, setUser ] = useState();
	const [ auth0Client, setAuth0Client ] = useState();
	const [ loading, setLoading ] = useState(true);
	const [ popupOpen, setPopupOpen ] = useState(false);
	
	useEffect(() => {
		const initAuth0 = async () => {
			const auth0FromHook = await createAuth0Client(initOptions);
			setAuth0Client(auth0FromHook);
			
			if ( window.location.search.includes("code=") && window.location.search.includes("state=") ) {
				const { appState } = await auth0FromHook.handleRedirectCallback();
				onRedirectCallback(appState);
			}
			
			const isAuthenticated = await auth0FromHook.isAuthenticated();
			setIsAuthenticated(isAuthenticated);
			
			if (isAuthenticated) {
				const user = await auth0FromHook.getUser();
				setUser(user);
			}
			
			setLoading(false);
		}
		initAuth0();
	}, []);
	
	const loginWithPopup = async (params = {}) => {
		setPopupOpen(true);
		
		try {
			await auth0Client.loginWithPopup(params);
		} catch(error) {
			console.log(error);
		} finally {
			setPopupOpen(false);
		}
		
		const user = await auth0Client.getUser();
		setIsAuthenticated(true);
		setUser(user);
	}
	
	const handleRedirectCallback = async () => {
		setLoading(true);
		await auth0Client.handleRedirectCallback();
		
		const user = await auth0Client.getUser();
		setLoading(false);
		setIsAuthenticated(true);
		setUser(user);
	}
	
	return (
		<Auth0Context.Provider
			value={{
				isAuthenticated,
				user,
				loading,
				popupOpen,
				loginWithPopup,
				handleRedirectCallback,
				getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
				loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
				getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
				getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
				logout: (...p) => auth0Client.logout(...p),
			}} >
				{children}
		</Auth0Context.Provider>
	);
};


/*
import auth0 from 'auth0-js';
  
class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-4epe1avp.us.auth0.com',
      clientID: '7evN3Cf0KtjvGezfZdzUxDRkcjbQUA3l',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://dev-4epe1avp.us.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid email'
    });

    this.authFlag = 'isLoggedIn';
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  }

  logout() {
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'D1lahFIpV82Mum7TimXgG0WPxpP8suGo',
    });
  }

  silentAuth() {
    if(this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.authFlag);
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });
    }
  }

  isAuthenticated() {
    // Check whether the current time is past the token's expiry time
    //return new Date().getTime() < this.expiresAt;
    return JSON.parse(localStorage.getItem(this.authFlag));
  }
}

const auth = new Auth();

export default auth;
*/