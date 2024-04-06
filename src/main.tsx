import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import './index.scss';
import AboutPage from './pages/about/AboutPage.tsx';
import HomePage from './pages/home/HomePage.tsx';
import MoviesPage from './pages/movies/MoviesPage.tsx';
import store from './store/index.ts';

const AppEntrypoint = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  );
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppEntrypoint />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'movies', element: <MoviesPage /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
