import cn from 'classnames';
import { ForwardedRef, forwardRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IInputProps } from './Input.interface';
import styles from './Input.module.scss';

const Input = forwardRef(
  ({ className, error, ...props }: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    useEffect(() => {
      if (error) {
        toast.error(error.message);
      }
    }, [error]);

    return (
      <div className={cn(styles.inputWrapper, className)}>
        <input className={cn(styles.input, { [styles.error]: error })} ref={ref} {...props} />
      </div>
    );
  },
);

export default Input;
