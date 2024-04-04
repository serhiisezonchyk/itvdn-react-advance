import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app-header">
        <ul className="app-header__menu">
          <li className="app-header__menu-item">
            <Link to="/">Home</Link>
          </li>
          <li className="app-header__menu-item">
            <Link to="/about">About</Link>
          </li>
          <li className="app-header__menu-item">
            <Link to="/movies">Movies</Link>
          </li>
        </ul>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
