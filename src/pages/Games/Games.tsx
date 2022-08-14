import { Link } from 'react-router-dom';
import { ROUTES } from '../../common';
import styles from './Games.module.scss';

function Games() {
  return (
    <div className={styles.games}>
      <h1>Games</h1>
      <div className={styles.exampleLinks}>
        <Link to={ROUTES.games.pages.audiocall.url}>
          Link 1 - {ROUTES.games.pages.audiocall.title}
        </Link>
        <Link to={ROUTES.games.pages.sprint.url}>Link 2 -{ROUTES.games.pages.sprint.title}</Link>
      </div>
    </div>
  );
}

export default Games;
