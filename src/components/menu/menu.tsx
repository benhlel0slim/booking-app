import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getRestaurant } from '../../api/getRestaurant';
import { useState } from 'react';
import styles from './menu.module.css';
import Button from '@mui/material/Button';
import { useSearchParams } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export function Menu() {
	const { restaurantId } = useParams();
	const { data } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);

	const { menu } = data ?? {};

	const menuList = menu?.map((item) => (
		<FormControlLabel value={item} control={<Radio />} label={item} />
	));

	const [value, setValue] = useState(menu?.[0]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const [, setSearchParams] = useSearchParams();
	const onNextPage = () => {
		setSearchParams({ step: 'calendar' });
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					veuillez <b> Choisir le Menu </b>
				</p>
			</div>
			<div className={styles.formControl}>
				<FormControl>
					<RadioGroup
						aria-label="Menu for the restaurant"
						name="Menu for the restaurant"
						value={value}
						onChange={handleChange}
					>
						{menuList}
					</RadioGroup>
				</FormControl>
			</div>
			<Button onClick={onNextPage} variant="contained">
				Suivant
			</Button>
		</div>
	);
}
