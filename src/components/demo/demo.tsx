import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Demo() {
  return (
    <div className={'demoLink'}>
      <Link to={'/restaurant/62c1a011e95e96a91dbfd023?step=guest'}>
        <Button variant="contained">Demo</Button>
      </Link>
    </div>
  );
}

export default Demo;
