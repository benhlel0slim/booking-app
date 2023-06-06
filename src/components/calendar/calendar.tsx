import CalendarComponent, { Detail } from 'react-calendar';
import { useQueries } from 'react-query';
import { getMonth } from '../../api/getMonth';
import { useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './calendar.module.css';
import dayjs from 'dayjs';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getKeyValuesFromUrlSearchParam } from '../../utils/searchParams';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const maxDate = new Date().setMonth(new Date().getMonth() + 3, 0);
const months = [month, month + 1, month + 2];

export function Calendar() {
	const [date, setDate] = useState(new Date());
	const [type, setType] = useState('short');
	const { restaurantId } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	const onNextPage = (time: string) => {
		setSearchParams({
			...getKeyValuesFromUrlSearchParam(searchParams),
			step: 'condition',
			duration: type,
			time,
			year: dayjs(date).format('YYYY'),
			month: dayjs(date).format('MMMM'),
			day: dayjs(date).format('DD'),
		});
	};

	const handleChange = (event: SelectChangeEvent) => {
		setType(event.target.value);
	};

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
		const currentTime = dayjs(time).format('HH:mm');
		return (
			<button className={styles.button} onClick={() => onNextPage(currentTime)}>
				{currentTime}
			</button>
		);
	});

	return (
		<div className={styles.container}>
			<CalendarComponent
				onChange={setDate}
				value={date}
				minDate={new Date()}
				maxDate={new Date(maxDate)}
				tileClassName={tileClassName}
				locale="fr-FR"
			/>
			<div className={styles.legends}>
				<div className={styles.legendGreen} />
				<p>Horaires disponibles</p>
				<div className={styles.legendRed} />
				<p>Pas d'heures disponibles</p>
			</div>
			<div className={styles.text}>
				<p>
					veuillez <b>choisir </b>
				</p>
			</div>
			<div className={styles.selectWrapper}>
				<Select
					className={styles.select}
					id="type of reservation"
					value={type}
					size="small"
					onChange={handleChange}
				>
					<MenuItem value="long">Long</MenuItem>
					<MenuItem value="short">Court</MenuItem>
				</Select>
			</div>
			<div className={styles.reservationTime}>
				{reservationTime || 'Indisponible pour Reservation'}
			</div>
		</div>
	);
}
