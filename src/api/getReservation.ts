import { URL_RESTAURANT } from '../constants/api';
import { ReservationData } from '../types/reservation';

export const getRestaurantReservation = async (
	restaurantId: string,
	token: string
) => {
	const endpoint = `${URL_RESTAURANT}/event/${restaurantId}`;
	try {
		const response = await fetch(endpoint, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			const result: Promise<ReservationData[]> = await response.json();
			return result;
		}
	} catch (error) {
		throw new Error('no reservation found');
	}
};
