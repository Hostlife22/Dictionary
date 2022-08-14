import { useState } from 'react';
import {
  useGetSettingsQuery,
  usePutSettingsMutation,
} from '../../features/settings/settingsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import styles from './Settings.module.scss';

function Settings() {
  const { user } = useAuth();
  const { data } = useGetSettingsQuery(user.userId || '');
  const [sound, setSound] = useState<boolean>(data?.optional?.sound || false);
  const [setSettings] = usePutSettingsMutation();

  console.log('Settings:', data);

  const handleSound = () => {
    setSound(!sound);
    setSettings({
      userId: user.userId || '',

      settings: {
        sound: !sound,
        textbook: {
          isTranslate: true,
          isShowButtons: true,
        },
        sprint: {
          timeGame: 60,
          showHelp: false,
          isEnglishLangWord: true,
        },
        audioCall: {
          countWords: 10,
          countVariants: 5,
          isTranslate: true,
          isEnglishLangWord: true,
        },
      },
    });
  };

  return (
    <div className={styles.settings}>
      <h1>Settings</h1>
      {data && (
        <div>
          <div>Sound: {data.optional.sound ? 'true' : 'false'}</div>
          <button onClick={handleSound}>Change sound</button>
        </div>
      )}
    </div>
  );
}

export default Settings;
