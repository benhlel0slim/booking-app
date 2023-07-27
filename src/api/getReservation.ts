import { URL_RESTAURANT } from '../constants/api';
import { GetEvent } from '../types/event';

export const getRestaurantReservation = async (id: string, token: string) => {
	const endpoint = `${URL_RESTAURANT}/event/${id}`;
	try {
		const response = await fetch(endpoint, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			const result: Promise<GetEvent> = await response.json();
			return result;
		}
	} catch (error) {
		throw new Error('no reservation found');
	}
};
