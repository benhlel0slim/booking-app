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
import { getKeyValuesFromUrlSearchParam } from '../../utils/searchParams';

export function Menu() {
	const { restaurantId } = useParams();
	const { data } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);

	const { menu } = data ?? {};

	const menuList = menu?.map((item) => (
		<FormControlLabel value={item} control={<Radio />} label={item} />
	));

	const [searchParams, setSearchParams] = useSearchParams();
	const menuInit = searchParams.get('menu');
	const [value, setValue] = useState(menuInit || menu?.[0]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const onNextPage = () => {
		if (value)
			setSearchParams({
				...getKeyValuesFromUrlSearchParam(searchParams),
				step: 'calendar',
				menu: value,
			});
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
