import CalendarComponent, { Detail } from 'react-calendar';
import { useQueries, useQuery } from 'react-query';
import { getMonth } from '../../api/getMonth';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getRestaurant } from '../../api/getRestaurant';
import styles from './calendar.module.css';
import dayjs from 'dayjs';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const maxDate = new Date().setMonth(new Date().getMonth() + 3, 0);
const months = [month, month + 1, month + 2];

export function Calendar() {
	const [date, setDate] = useState(new Date());
	const { restaurantId } = useParams();
	const { data } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);
	console.log(data);

	const monthData = useQueries(
		months.map((m) => ({
			queryKey: ['month', m],
			queryFn: () => getMonth(restaurantId || '', m, year),
		}))
	);

	function tileClassName({ date, view }: { date: Date; view: Detail }) {
		const index = months.indexOf(date.getMonth());
		const _currentMonth = monthData[index]?.data;
		if (view === 'month' && _currentMonth) {
			const keys = Object.keys(_currentMonth);
			const isAvailable = keys.includes(date.getDate().toString());
			return isAvailable ? 'green' : 'red';
		}
		return '';
	}

	const index = months.indexOf(date.getMonth());
	const times = monthData[index].data?.[date.getDate()];
	const reservationTime = times?.map((time) => {
		return <span> {dayjs(time).format('HH:mm')}</span>;
	});

	const [type, setType] = useState('');
	const handleChange = (event: SelectChangeEvent) => {
		setType(event.target.value as string);
	};

	return (
		<div className={styles.container}>
			<CalendarComponent
				onChange={setDate}
				value={date}
				minDate={new Date()}
				maxDate={new Date(maxDate)}
				tileClassName={tileClassName}
			/>
			<div className={styles.cardContent}>
				<div className={styles.cardContentGreen}></div>
				<p>Horaires disponibles</p>
				<div className={styles.cardContentRed}></div>
				<p>Pas d'heures disponibles</p>
			</div>
			<div className={styles.text}>
				<p>
					veuillez <b>choisir </b>
				</p>
			</div>
			<div className={styles.divSelect}>
				<Select
					className={styles.select}
					labelId="type of reservation"
					id="type of reservation"
					value={type}
					size="small"
					label="Type"
					onChange={handleChange}
				>
					<MenuItem value={'long'}>long</MenuItem>
					<MenuItem value={'court'}>court</MenuItem>
				</Select>
			</div>
			<div className={styles.reservationTime}>{reservationTime}</div>
		</div>
	);
}
