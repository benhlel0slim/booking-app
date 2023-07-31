import React from 'react';
import { useSetRecoilState } from 'recoil';
import { token as AuthToken } from '../../../store/authentication';
import { Switch } from '@mui/material';
import styles from './logout.module.css';

function Logout() {
  const setAuthToken = useSetRecoilState(AuthToken);

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthToken('');
    setChecked(event.target.checked);
  };

  return (
    <div className={styles.logout}>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </div>
  );
}

export default Logout;
