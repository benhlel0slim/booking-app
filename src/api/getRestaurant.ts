import { Restaurant } from './../types/restaurant';
import { URL_RESTAURANT } from '../constants/api';

/**
 * Get restaurant data
 * `useQuery`
 */
export const getRestaurant = async (restaurantId: string) => {
	const endpoint = `${URL_RESTAURANT}/restaurant/${restaurantId}`;
	try {
		if (restaurantId === '') return;
		const response = await fetch(endpoint);
		if (response.ok) {
			const result: Restaurant = await response.json();
			return result;
		}
	} catch (error) {
		throw new Error('restaurant not found');
	}
};
