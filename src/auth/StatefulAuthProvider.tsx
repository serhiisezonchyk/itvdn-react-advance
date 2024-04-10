import { AppState, Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import configuration from '../configuration';

interface StatefulAuthProviderProps {
  children: React.ReactNode;
}
const authConfig = {
  domain: configuration.authDomain!,
  clientId: configuration.authClient!,
  authorizationParams: {
    redirect_uri: configuration.callbackUrl!,
  },
};
const StatefulAuthProvider = ({ children }: StatefulAuthProviderProps) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location);
  };
  return (
    <Auth0Provider {...authConfig} cacheLocation="localstorage" onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  );
};

export default StatefulAuthProvider;
