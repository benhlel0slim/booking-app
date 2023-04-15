import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styles from './guest.module.css';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import OutlinedInput from '@mui/material/OutlinedInput';
import RemoveIcon from '@mui/icons-material/Remove';
import InputAdornment from '@mui/material/InputAdornment';
import { useSearchParams } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const Guest = () => {
	const [guest, setGuest] = useState(1);
	const [, setSearchParams] = useSearchParams();
	const theme = createTheme({
		palette: {
			primary: {
				main: '#EC691A',
			},
		},
	});

	const handleClick = (name: 'min' | 'max') => {
		if (name === 'min' && guest > 1) setGuest(guest - 1);
		if (name === 'max' && guest < 8) setGuest(guest + 1);
	};

	const onNextPage = () => {
		setSearchParams({ step: 'menu' });
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					veuillez <b>choisir le nombre</b> d'invités
				</p>
			</div>
			<div>
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
							<IconButton size="small" onClick={() => handleClick('min')}>
								<RemoveIcon fontSize="inherit" />
							</IconButton>
						</InputAdornment>
					}
					endAdornment={
						<InputAdornment position="end">
							<IconButton size="small" onClick={() => handleClick('max')}>
								<AddIcon fontSize="inherit" />
							</IconButton>
						</InputAdornment>
					}
				/>
			</div>
			<div>
				<ThemeProvider theme={theme}>
					<Button onClick={onNextPage} variant="contained">
						Suivant
					</Button>
				</ThemeProvider>
			</div>
		</div>
	);
};
