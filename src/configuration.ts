const configuration = {
  apiUrl: import.meta.env.VITE_APP_API_URL,
  apiToken: import.meta.env.VITE_APP_ACCESS_TOKEN_API,
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
  authClient: import.meta.env.VITE_APP_AUTH0_CLIENT,
  callbackUrl:import.meta.env.VITE_APP_AUTH0_CALLBACK_URL
};
export default configuration;
