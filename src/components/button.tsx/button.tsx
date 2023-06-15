import React from 'react';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

type ButtonProps = {
	title: string;
	statu: string;
};
function NavigateButton({ title, statu }: ButtonProps) {
	return (
		<div>
			<Button
				sx={{ minWidth: 140, height: 37 }}
				disabled={statu === 'loading'}
				type="submit"
				variant="contained"
			>
				{statu === 'loading' ? <CircularProgress size={12} /> : title}
			</Button>
		</div>
	);
}

export default NavigateButton;
