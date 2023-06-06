import { useSearchParams } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import styles from './navigation.module.css';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getKeyValuesFromUrlSearchParam } from '../../utils/searchParams';

export const Navigation = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const time = searchParams.get('time');
	const guest = searchParams.get('guest');
	const menu = searchParams.get('menu');
	const day = searchParams.get('day');
	const month = searchParams.get('month');
	const year = searchParams.get('year');

	const guestPage = () => {
		if (guest)
			setSearchParams({
				...getKeyValuesFromUrlSearchParam(searchParams),
				step: 'guest',
			});
	};
	const menuPage = () => {
		if (menu)
			setSearchParams({
				...getKeyValuesFromUrlSearchParam(searchParams),
				step: 'menu',
			});
	};
	const calendarPage = () => {
		if (time)
			setSearchParams({
				...getKeyValuesFromUrlSearchParam(searchParams),
				step: 'calendar',
			});
	};
	return (
		<div className={styles.container}>
			{guest && (
				<button className={styles.btn} onClick={guestPage}>
					<GroupIcon className={styles.icons} />
					{guest}
				</button>
			)}

			{menu && (
				<button className={styles.btn} onClick={menuPage}>
					<RestaurantMenuIcon className={styles.icons} />
					{menu}
				</button>
			)}

			{time && (
				<button className={styles.btn} onClick={calendarPage}>
					<CalendarMonthIcon className={styles.icons} />
					{day} {month} {year}, {time}
				</button>
			)}
		</div>
	);
};
