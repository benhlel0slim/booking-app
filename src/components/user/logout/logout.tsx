import React from 'react';
import { useSetRecoilState } from 'recoil';
import { token as AuthToken } from '../../../store/authentication';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const setAuthToken = useSetRecoilState(AuthToken);

  const handleChange = () => {
    setAuthToken('');
    navigate('/admin/login');
  };

  return (
    <Button
      style={{ minHeight: 20, minWidth: 100, padding: 0 }}
      onClick={handleChange}
      variant="text"
    >
      Logout
    </Button>
  );
}

export default Logout;
