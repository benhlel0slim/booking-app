import { Reservation, ReservationData } from '../types/reservation';
import { URL_RESTAURANT } from '../constants/api';
import { useMutation } from 'react-query';
import { ReservationError } from '../types/error';

/**
 * Post reservation data
 * `useMutation`
 */
export const createReservation = async (reservation: Reservation) => {
	const endpoint = `${URL_RESTAURANT}/reservation`;
	try {
		const rawResponse = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reservation),
		});
		const result: ReservationData | ReservationError = await rawResponse.json();
		return result;
	} catch (error) {
		throw new Error('something went wrong, the reservation was not sent');
	}
};

export const useCreateReservation = () => {
	return useMutation(createReservation);
};
