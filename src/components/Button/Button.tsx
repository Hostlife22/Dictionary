import cn from 'classnames';
import { ButtonProps } from './Button.interface';
import styles from './Button.module.scss';

function Button({ children, appearance, className, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost',
        [styles.secondary]: appearance === 'secondary',
      })}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
