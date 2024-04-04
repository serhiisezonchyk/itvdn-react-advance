import { Link, Outlet } from 'react-router-dom';
import styles from './App.module.scss';
function App() {
  return (
    <div className={styles.app}>
      <div className={styles.app_header}>
        <img className={styles.app_header__logo} src="./png/logo.png" alt="" />
        <ul className={styles.app_header__menu}>
          <li className={styles.app_header__menu_item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.app_header__menu_item}>
            <Link to="/about">About</Link>
          </li>
          <li className={styles.app_header__menu_item}>
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
