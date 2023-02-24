import { useSearchParams } from 'react-router-dom';
import { Calendar } from '../calendar/calendar';
import { Condition } from '../condition/condition';
import { Confirmation } from '../confirmation/confirmation';
import { Guest } from '../guest/guest';
import { Menu } from '../menu/menu';
import { Reservation } from '../reservation/reservation';
import { useEffect } from 'react';

function Client() {
	const [searchParams, setSearchParams] = useSearchParams();
	const step = searchParams.get('step');

	useEffect(() => {
		if (!step) setSearchParams({ step: 'guest' });
	}, [setSearchParams, step]);

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
