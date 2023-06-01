import { useSearchParams } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import styles from './navigation.module.css';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const Navigation = () => {
	const [searchParams] = useSearchParams();
	const time = searchParams.get('time');
	const guest = searchParams.get('guest');
	const menu = searchParams.get('menu');
	const day = searchParams.get('day');
	const month = searchParams.get('month');
	const year = searchParams.get('year');
	const step = searchParams.get('step');

	return (
		<div className={styles.container}>
			{step === 'menu' && (
				<div>
					<GroupIcon />
					{guest}
				</div>
			)}

			{step === 'calendar' && (
				<div>
					<GroupIcon />
					{guest}
					<RestaurantMenuIcon />
					{menu}
				</div>
			)}

			{step === 'condition' && (
				<div>
					<GroupIcon />
					{guest}
					<RestaurantMenuIcon />
					{menu}
					<CalendarMonthIcon />
					{day}.{month}.{year} ,{time}
				</div>
			)}
		</div>
	);
};
