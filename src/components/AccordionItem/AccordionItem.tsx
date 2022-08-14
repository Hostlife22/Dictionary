import cn from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_COUNT, ROUTES } from '../../common';
import styles from './AccordionItem.module.scss';
import { IAccordionItemProps } from './IAccordionItem.interface';

function AccordionItem({ group }: IAccordionItemProps) {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <>
      <button
        className={cn(styles.accordion, { [styles.active]: isShow })}
        onClick={() => setIsShow((prev) => !prev)}>
        Section {group + 1}
      </button>
      <div className={cn(styles.panel, { [styles.active]: isShow })}>
        {Array.from({ length: PAGE_COUNT }, (_, i) => i).map((i) => (
          <Link to={`${ROUTES.textbook.url}/${group}/${i}`} key={i} className={styles.group}>
            page {i}
          </Link>
        ))}
      </div>
    </>
  );
}

export default AccordionItem;
