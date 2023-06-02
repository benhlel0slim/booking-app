import { useParams, useSearchParams } from 'react-router-dom';
import styles from './condition.module.css';
import Button from '@mui/material/Button';
import { getKeyValuesFromUrlSearchParam } from '../../utils/searchParams';
import { useQuery } from 'react-query';
import { getRestaurant } from '../../api/getRestaurant';

export function Condition() {
	const { restaurantId } = useParams();
	const { data } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);
	const [searchParams, setSearchParams] = useSearchParams();
	const time = searchParams.get('time');
	const onNextPage = () => {
		setSearchParams({
			...getKeyValuesFromUrlSearchParam(searchParams),
			step: 'reservation',
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					Accepter les <b>Conditions</b>
				</p>
			</div>
			<div className={styles.text}>
				<p>
					Cher invité,
					<br />
					<br /> Veuillez noter que la table est la vôtre jusqu'à {`${time} `}
					et peut ensuite être réservée par d'autres clients.
					<br /> <br />
					Cordialement,
					<br />
					<br /> {` ${data?.name}.`}
				</p>
			</div>
			<Button onClick={onNextPage} variant="contained">
				Accepter
			</Button>
		</div>
	);
}
