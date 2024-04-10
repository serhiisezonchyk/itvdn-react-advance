import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { LinearProgress } from '@mui/material';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import AuthCallback from './auth/AuthCallback.tsx';
import AuthenticationGuard from './auth/AuthenticationGuard.tsx';
import StatefulAuthProvider from './auth/StatefulAuthProvider.tsx';
import './index.scss';
import HomePage from './pages/home/HomePage.tsx';
import ProfilePage from './pages/profile/ProfilePage.tsx';
import store from './store/index.ts';

const MoviesPage = lazy(() => import('./pages/movies/MoviesPage.tsx'));
function fallbackRender({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary(): void }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <pre style={{ color: 'red' }}>{error.stack}</pre>
    </div>
  );
}

const AppEntrypoint = () => {
  return (
    <StatefulAuthProvider>
      <Provider store={store}>
        <ErrorBoundary fallbackRender={fallbackRender} onError={(error, _) => alert(error)}>
          <App />
        </ErrorBoundary>
      </Provider>
    </StatefulAuthProvider>
  );
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppEntrypoint />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'about', lazy: () => import('./pages/about/AboutPage.tsx') },
      {
        path: 'movies',
        element: (
          <Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
            <MoviesPage />
          </Suspense>
        ),
      },
      { path: 'callback', element: <AuthCallback /> },
      { path: 'profile', element: <AuthenticationGuard component={ProfilePage} /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
