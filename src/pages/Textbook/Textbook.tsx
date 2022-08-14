import { useMemo } from 'react';
import { GROUP_COUNT } from '../../common';
import { Accordion } from '../../components';
import styles from './Textbook.module.scss';

function Textbook() {
  const memoizedArrNumber = useMemo(() => Array.from({ length: GROUP_COUNT }, (_, i) => i), []);

  console.log('Textbook', memoizedArrNumber);

  return (
    <div className={styles.textbook}>
      <Accordion />
    </div>
  );
}

export default Textbook;
