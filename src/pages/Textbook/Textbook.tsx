import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GROUP_COUNT } from '../../common';
import { Pagination, WordCard } from '../../components';
import {
  useActiveWordsByUserQuery,
  useCountWordsByGroupQuery,
} from '../../features/aggregatedWords/aggregatedWordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import styles from './Textbook.module.scss';

const PageSize = 20;

function Textbook() {
  const memoizedArrNumber = useMemo(() => Array.from({ length: GROUP_COUNT }, (_, i) => i), []);
  const {
    user: { userId },
  } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: countWords } = useCountWordsByGroupQuery({ userId: userId || '', group: 0 });
  const { data: activeWords } = useActiveWordsByUserQuery({
    userId: userId || '',
    group: 0,
    page: 0,
  });

  console.log('countWords', countWords);
  console.log('activeWords', activeWords);

  return (
    <div className={styles.textbook}>
      <ul className={styles.chapterList}>
        {memoizedArrNumber.map((num) => (
          <li className={styles.chapterItem} key={num}>
            <Link to="/textbook">Chapter {num + 1}</Link>{' '}
          </li>
        ))}
      </ul>
      <div className={styles.textbookContainer}>
        <h3>
          The chapter learns {countWords || 0} of the {activeWords?.totalCount || 600} words.
        </h3>
        <ul className={styles.cardList}>
          {activeWords?.paginatedResults.map((word) => (
            <WordCard word={word} key={word.id} />
          ))}
        </ul>
      </div>

      <Pagination
        className={styles.paginationBar}
        currentPage={currentPage}
        total={600}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Textbook;
