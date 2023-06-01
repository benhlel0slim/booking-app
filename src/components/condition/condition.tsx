import { useSearchParams } from 'react-router-dom';
import { Navigation } from '../navigation-module/navigation';
import styles from './condition.module.css';
import Button from '@mui/material/Button';
import { getKeyValuesFromUrlSearchParam } from '../../utils/searchParams';

export function Condition() {
	const [searchParams, setSearchParams] = useSearchParams();
	const time = searchParams.get('time');
	const onNextPage = () => {
		setSearchParams({
			step: 'reservation',
		});
	};
	getKeyValuesFromUrlSearchParam(searchParams);
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
					<br /> Chez Bibi
				</p>
			</div>
			<Button onClick={onNextPage} variant="contained">
				Accepter
			</Button>
		</div>
	);
}
