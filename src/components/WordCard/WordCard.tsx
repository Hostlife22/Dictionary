import { BASE_URL, UserWordStatus } from '../../common';
import Button from '../Button/Button';
import { IWordCardProps } from './WordCard.interface';
import styles from './WordCard.module.scss';

function WordCard({ word }: IWordCardProps) {
  const isHard = word.userWord?.difficulty === UserWordStatus.HARD;
  return (
    <li className={styles.wordItem}>
      <div className={styles.imgContainer}>
        <img src={BASE_URL + word.image} alt={word.word} />
      </div>
      <div className={styles.container}>
        <h4>
          {word.word} {word.transcription} {word.wordTranslate}
        </h4>
        <div className={styles.btns}>
          <Button appearance={isHard ? 'secondary' : 'primary'}>
            {isHard ? 'Простое' : 'Сложное'}
          </Button>
          <Button appearance="ghost">Delete</Button>
        </div>
      </div>
    </li>
  );
}

export default WordCard;
