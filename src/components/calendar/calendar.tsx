import CalendarComponent from 'react-calendar';
import { useQueries } from 'react-query';
import { getMonth } from '../../api/getMonth';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Style from './calendar.module.css';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const maxDate = new Date().setMonth(new Date().getMonth() + 3, 0);

export function Calendar() {
	const { restaurantId } = useParams();
	const [currentMonth, secondMonth, thirdMonth] = useQueries([
		{
			queryKey: ['month', 1],
			queryFn: () => getMonth(restaurantId || '', month, year),
		},
		{
			queryKey: ['month', 2],
			queryFn: () => getMonth(restaurantId || '', month + 1, year),
		},
		{
			queryKey: ['month', 3],
			queryFn: () => getMonth(restaurantId || '', month + 2, year),
		},
	]);
	console.log(currentMonth.data, secondMonth.data, thirdMonth.data);
	const [date, setDate] = useState(new Date());

	return (
		<div>
			Calendar
			<CalendarComponent
				onChange={setDate}
				value={date}
				minDate={new Date()}
				maxDate={new Date(maxDate)}
			/>
		</div>
	);
}
