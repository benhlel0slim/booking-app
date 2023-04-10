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

	const [date, setDate] = useState(new Date());

	function tileClassName({ date, view }: { date: Date; view: Detail }) {
		//date 10 04 2023 view === 'month'
		if (view === 'month' && currentMonth.data && date.getMonth() === month) {
			const keys = Object.keys(currentMonth.data); //['12','13','14','15','16'...]

			const isAvailable = keys.includes(date.getDate().toString()); // '10' isAvailable=false
			return isAvailable ? 'green' : 'red';
			/* if (isAvailable) {
				return 'green';
			}
			return 'red'; */
		}
		if (view === 'month' && secondMonth.data && date.getMonth() === month + 1) {
			const keys = Object.keys(secondMonth.data); //['12','13','14','15','16'...]

			const isAvailable = keys.includes(date.getDate().toString()); // '10' isAvailable=false
			return isAvailable ? 'green' : 'red';
			/* if (isAvailable) {
				return 'green';
			}
			return 'red'; */
		}
		if (view === 'month' && thirdMonth.data && date.getMonth() === month + 2) {
			const keys = Object.keys(thirdMonth.data); //['12','13','14','15','16'...]

			const isAvailable1 = keys.includes(date.getDate().toString()); // '10' isAvailable=false
			return isAvailable1 ? 'green' : 'red';
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
