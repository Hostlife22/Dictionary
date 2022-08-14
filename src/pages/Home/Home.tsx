import { useState } from 'react';
import { useDeleteUserMutation } from '../../features/user/userApiSlice';
import styles from './Home.module.scss';

function Home() {
  const [value, setValue] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  //   const { data: userData } = useGetUserQuery('62f78c9e15f0af1ae7945380');
  //   const { data: userData2 } = useGetUserWordQuery({
  //     userId: '62f3b84b0c24ff2e00c3069a',
  //     wordId: value,
  //   });
  const [updateUser, { data }] = useDeleteUserMutation();
  //   const dispatch = useAppDispatch();

  //   const { data: datadic } = useGetUserWordsQuery('62f3b84b0c24ff2e00c3069a');
  //   const { data } = useActiveWordsByUserQuery({
  //     group: 0,
  //     page: 0,
  //     userId: '62f3b84b0c24ff2e00c3069a',
  //   });
  //   const { data } = useCountWordsByGroupQuery({
  //     group: 0,
  //     userId: '62f3b84b0c24ff2e00c3069a',
  //   });

  //   console.log(userData);

  //   console.log(data);

  const handle = () => {
    updateUser('62f7887115f0af1ae7945351');
    // dispatch(
    //   setSettings({
    //     sound: SettingsNameEnum.SOUND,
    //     settings: false,
    //   }),
    // );
  };

  //   123123@mail.ru
  return (
    <div className={styles.home}>
      <input
        type="text"
        value={value}
        placeholder="name"
        onChange={(e) => setValue(e.target.value)}
        style={{ border: '2px solid gray' }}
      />
      <input
        type="text"
        value={mail}
        placeholder="mail"
        onChange={(e) => setMail(e.target.value)}
        style={{ border: '2px solid gray' }}
      />
      <h1>RSLang - приложение для изучения английского языка!</h1>
      <button onClick={handle}>Click</button>
    </div>
  );
}

export default Home;
