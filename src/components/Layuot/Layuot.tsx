import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer, Header } from '..';
import { useGetSettingsQuery } from '../../features/settings/settingsApiSlice';
import { useGetStatisticQuery } from '../../features/statistic/statisticApiSlice';
import { useAuth } from '../../hooks/useAuth';
import styles from './Layout.module.scss';

function Layout() {
  const { user } = useAuth();

  useGetStatisticQuery(user.userId || '');
  useGetSettingsQuery(user.userId || '');

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default Layout;
