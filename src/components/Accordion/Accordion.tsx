import { GROUP_COUNT } from '../../common';
import AccordionItem from '../AccordionItem/AccordionItem';
import styles from './Accordion.module.scss';

function Accordion() {
  return (
    <div className={styles.accordionContainer}>
      {Array.from({ length: GROUP_COUNT }, (_, i) => i).map((i) => (
        <AccordionItem key={i} group={i} />
      ))}
    </div>
  );
}

export default Accordion;
