import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app';
import { ROUTES } from '../../common';
import { logout } from '../../features/auth/authSlice';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.scss';

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const handleLoginLogout = () => {
    if (user.token) {
      toast.success('User Logout Successfully');
      dispatch(logout());
    }

    navigate(ROUTES.auth.url, { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.main.url}>RS Lang</Link>
      </div>
      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link to={ROUTES.games.url}>
              <span className={styles.menuItemText}>{ROUTES.games.title}</span>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to={ROUTES.dictionary.url}>
              <span className={styles.menuItemText}>{ROUTES.dictionary.title}</span>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to={ROUTES.textbook.url}>
              <span className={styles.menuItemText}>{ROUTES.textbook.title}</span>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to={ROUTES.statistics.url}>
              <span className={styles.menuItemText}>{ROUTES.statistics.title}</span>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to={ROUTES.settings.url}>
              <span className={styles.menuItemText}>{ROUTES.settings.title}</span>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to={ROUTES.aboutTeam.url}>
              <span className={styles.menuItemText}>{ROUTES.aboutTeam.title}</span>
            </Link>
          </li>
        </ul>

        <button className={styles.btn} onClick={handleLoginLogout}>
          {user.token ? 'Выйти' : 'Авторизация'}
        </button>
      </nav>
    </header>
  );
}

export default Header;
