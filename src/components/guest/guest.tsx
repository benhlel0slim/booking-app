import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styles from './guest.module.css';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import OutlinedInput from '@mui/material/OutlinedInput';
import RemoveIcon from '@mui/icons-material/Remove';
import InputAdornment from '@mui/material/InputAdornment';
import { useSearchParams } from 'react-router-dom';
import { getKeyValuesFromUrlSearchParam } from '../../utils/searchParams';

export const Guest = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const guestInit = searchParams.get('guest');
  const [guest, setGuest] = useState(guestInit ? Number(guestInit) : 1);

  const handleClick = (name: 'min' | 'max') =>
    setGuest(name === 'min' ? guest - 1 : guest + 1);

  const onNextPage = () => {
    setSearchParams({
      ...getKeyValuesFromUrlSearchParam(searchParams),
      step: 'menu',
      guest: String(guest),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>
          veuillez <b>choisir le nombre</b> d'invités
        </p>
      </div>
      <OutlinedInput
        className={styles.outlinedInput}
        size="small"
        inputMode="numeric"
        inputProps={{
          min: 1,
          value: guest,
          max: 8,
          className: styles.input,
        }}
        startAdornment={
          <InputAdornment position="start">
            <IconButton
              disabled={guest === 1}
              size="small"
              onClick={() => handleClick('min')}
            >
              <RemoveIcon fontSize="inherit" />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              disabled={guest === 8}
              size="small"
              onClick={() => handleClick('max')}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </InputAdornment>
        }
      />
      <Button onClick={onNextPage} variant="contained">
        Suivant
      </Button>
    </div>
  );
};
