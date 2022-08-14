import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../common';
import { AuthForm } from '../../components';
import { LocationParams } from './Auth.interface';

import styles from './Auth.module.scss';

function Auth() {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const location = useLocation() as LocationParams;
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || ROUTES.main.url;

  const navigateToPage = () => {
    navigate(from, { replace: true });
  };

  return (
    <div className={styles.auth}>
      <h2> {!showRegister ? 'Login' : 'Register'}</h2>
      <p>
        {!showRegister ? 'Please enter your Email & Password' : 'Please enter your User detail'}
      </p>
      <div className={styles.containerForm}>
        <AuthForm
          isRegister={showRegister}
          handleLogin={() => setShowRegister(false)}
          navigate={navigateToPage}
        />
        <h5>
          {!showRegister ? (
            <>
              Dont&rsquo;t have an account ?{' '}
              <p className={styles.authLink} onClick={() => setShowRegister(true)}>
                Sign Up
              </p>
            </>
          ) : (
            <>
              Alredy have an account ?{' '}
              <p className={styles.authLink} onClick={() => setShowRegister(false)}>
                Sign In
              </p>
            </>
          )}
        </h5>
      </div>
    </div>
  );
}

export default Auth;
