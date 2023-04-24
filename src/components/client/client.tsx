import { useSearchParams } from 'react-router-dom';
import { Calendar } from '../calendar/calendar';
import { Condition } from '../condition/condition';
import { Confirmation } from '../confirmation/confirmation';
import { Guest } from '../guest/guest';
import { Menu } from '../menu/menu';
import { Reservation } from '../reservation/reservation';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from 'react-query';
import { getRestaurant } from '../../api/getRestaurant';
import { useParams } from 'react-router-dom';

function Client() {
	const { restaurantId } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const step = searchParams.get('step');
	const { data } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);

	useEffect(() => {
		if (!step) setSearchParams({ step: 'guest' });
	}, [setSearchParams, step]);

	if (!data) {
		return <CircularProgress />;
	}

	return (
		<>
			{step === 'guest' && <Guest />}
			{step === 'menu' && <Menu />}
			{step === 'calendar' && <Calendar />}
			{step === 'reservation' && <Reservation />}
			{step === 'confirmation' && <Confirmation />}
			{step === 'condition' && <Condition />}
		</>
	);
}
export default Client;
