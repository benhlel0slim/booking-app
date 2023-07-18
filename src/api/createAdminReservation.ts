import { URL_RESTAURANT } from '../constants/api';
import { useMutation } from 'react-query';
import { ResponseWithError } from '../types/error';
import { useRecoilValue } from 'recoil';
import { token } from '../store/authentication';
import { Event } from '../types/event';
import { ReservationData } from '../types/reservation';

const createRestaurantReservation = async (
	reservation: Event,
	token: string
) => {
	const endpoint = `${URL_RESTAURANT}/event`;
	try {
		const rawResponse = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(reservation),
		});
		const content: ResponseWithError<ReservationData> =
			await rawResponse.json();
		return content;
	} catch (error) {
		throw new Error('something went wrong, the reservation was not sent');
	}
};

export const useCreateRestaurantReservation = () => {
	const _token = useRecoilValue(token);
	return useMutation((adminReservation: Event) =>
		createRestaurantReservation(adminReservation, _token)
	);
};
