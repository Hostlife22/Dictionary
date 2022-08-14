import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../../app';
import { MESSAGES } from '../../common';
import { checkNewRegister } from '../../common/utils/checkNewRegister';
import { useAuthMutation } from '../../features/auth/authApiSlice';
import { newUser, setUser } from '../../features/auth/authSlice';
import { usePutSettingsMutation } from '../../features/settings/settingsApiSlice';
import { initialState as settings } from '../../features/settings/settingsSlice';
import { usePutStatisticMutation } from '../../features/statistic/statisticApiSlice';
import { initialState as statistic } from '../../features/statistic/statisticSlice';
import { useCreateUserMutation } from '../../features/user/userApiSlice';
import Input from '../Input/Input';
import { IAuthForm, IAuthFormProps } from './AuthForm.interface';
import styles from './AuthForm.module.scss';

function AuthForm({ isRegister, handleLogin, navigate }: IAuthFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    clearErrors,
    register,
    reset,
  } = useForm<IAuthForm>();

  const [createUser] = useCreateUserMutation();
  const [loginUser] = useAuthMutation();
  const [setStatistic] = usePutStatisticMutation();
  const [setSettings] = usePutSettingsMutation();
  const dispatch = useAppDispatch();

  const createNewUser = useCallback(async (formData: IAuthForm) => {
    await createUser(formData)
      .unwrap()
      .then((data) => {
        toast.success(MESSAGES.signUp.success);
        dispatch(newUser(data.id));
        reset();
        handleLogin();
      })
      .catch((err) => {
        toast.error(MESSAGES.signUp.error);
      });
  }, []);

  const loginUserHandler = useCallback(async ({ name, ...rest }: IAuthForm) => {
    await loginUser(rest)
      .unwrap()
      .then(({ message, ...user }) => {
        toast.success(MESSAGES.signIn.success);
        const newUserId = checkNewRegister();
        dispatch(setUser(user));
        navigate();

        if (newUserId) {
          setStatistic({ userId: user.userId, statistic });
          setSettings({ userId: user.userId, settings });
        }
      })
      .catch((err) => {
        toast.error(MESSAGES.signIn.error);
      });
  }, []);

  const onSubmit = async (formData: IAuthForm): Promise<void> => {
    if (isRegister) {
      createNewUser(formData);
    } else {
      loginUserHandler(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isRegister && (
        <Input
          {...register('name', {
            required: { value: true, message: MESSAGES.validation.required.name },
            minLength: {
              value: 2,
              message: MESSAGES.validation.name,
            },
          })}
          placeholder="Name"
          error={errors.name}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
      )}

      <Input
        {...register('email', {
          required: { value: true, message: MESSAGES.validation.required.email },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: MESSAGES.validation.email,
          },
        })}
        placeholder="Email"
        error={errors.email}
        aria-invalid={errors.email ? 'true' : 'false'}
      />
      <Input
        {...register('password', {
          required: { value: true, message: MESSAGES.validation.required.password },
          minLength: {
            value: 8,
            message: MESSAGES.validation.password,
          },
        })}
        autoComplete="on"
        placeholder="Password"
        type="password"
        error={errors.password}
        aria-invalid={errors.name ? 'true' : 'false'}
      />

      <button type="submit" className={styles.btn} onClick={() => clearErrors()}>
        {isRegister ? 'Register' : 'Login'}
      </button>
    </form>
  );
}

export default AuthForm;
