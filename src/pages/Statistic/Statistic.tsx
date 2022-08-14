import { useAppDispatch, useAppSelector } from '../../app';
import { selectAuth } from '../../features/auth/authSlice';
import { usePutStatisticMutation } from '../../features/statistic/statisticApiSlice';
import { StatisticNameEnum } from '../../features/statistic/statisticApiSlice.interface';
import { selectStatistic, setStatistics } from '../../features/statistic/statisticSlice';
import { getStatistic } from '../../features/statistic/statisticSliceHelper';
import styles from './Statistic.module.scss';

function Statistic() {
  const { statistics, learnedWords } = useAppSelector(selectStatistic);
  const { userId } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [setStatistic, { data }] = usePutStatisticMutation();

  console.log('Вся статистика:', statistics);
  console.log('Изученные слова:', learnedWords);

  const exampleSetStatistic = () => {
    const newStat = getStatistic(statistics, {
      experience: 19,
      name: StatisticNameEnum.SPRINT,
      score: 200,
      seriesTrueAnswers: 5,
      timeStart: new Date().toISOString(),
      timeStop: new Date().toISOString(),
      wordsFalse: [
        '5e9f5ee35eb9e72bc21af9a2',
        '5e9f5ee35eb9e72bc21b01cf',
        '5e9f5ee35eb9e72bc21af9aa',
        '5e9f5ee35eb9e72bc21af9ab',
        '5e9f5ee35eb9e72bc21b01c2',
      ],
      wordsTrue: [
        '5e9f5ee35eb9e72bc21af9af',
        '5e9f5ee35eb9e72bc21af9b2',
        '5e9f5ee35eb9e72bc21b01cb',
        '5e9f5ee35eb9e72bc21af9a1',
        '5e9f5ee35eb9e72bc21b01cd',
      ],
    });
    dispatch(setStatistics(newStat));

    setStatistic({
      userId: userId || '',
      statistic: newStat,
    }).unwrap();
  };

  return (
    <div className={styles.statistic}>
      <h1>Statistic</h1>
      <button onClick={exampleSetStatistic}>Set Statistic</button>
      <div>
        <h2>Изученно слов: {learnedWords}</h2>
      </div>
    </div>
  );
}

export default Statistic;
