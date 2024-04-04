import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import AboutPage from './pages/about/AboutPage.tsx';
import MoviesPage from './pages/movies/MoviesPage.tsx';
import store from './store/index.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    children: [
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
