import CalendarComponent, { Detail } from 'react-calendar';
import { useQueries, useQuery } from 'react-query';
import { getMonth } from '../../api/getMonth';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getRestaurant } from '../../api/getRestaurant';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const maxDate = new Date().setMonth(new Date().getMonth() + 3, 0);

export function Calendar() {
	const { restaurantId } = useParams();
	const { data } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);

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
	const highlightDates = [currentMonth.data, secondMonth.data, thirdMonth.data];
	const [date, setDate] = useState(new Date());

	function tileClassName({ date, view }: { date: Date; view: Detail }) {
		if (view === 'month' && secondMonth.data) {
			const keys = Object.keys(secondMonth.data); //get keys from object as an array
			const isAvailable = keys.includes(date.getDate().toString());
			return isAvailable ? 'green' : 'red';
			/* if (isAvailable) {
				return 'green';
			}
			return 'red'; */
		}
		return '';
	}
	return (
		<div>
			Calendar
			<CalendarComponent
				onChange={setDate}
				value={date}
				minDate={new Date()}
				maxDate={new Date(maxDate)}
				//tileDisabled={({ date }) => [1, 2].includes(date.getDay())}
				tileClassName={tileClassName}
			/>
		</div>
	);
}
