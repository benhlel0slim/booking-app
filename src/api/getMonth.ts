import { Month } from './../types/month';
import { URL_RESTAURANT } from '../constants/api';

/**
 * Get month data
 * `useQuery`
 */
export const getMonth = async (
	restaurantId: string,
	month: number,
	year: number
) => {
	const endpoint = `${URL_RESTAURANT}/month?year=${year}&month=${month}&restaurant=${restaurantId}`;
	try {
		const response = await fetch(endpoint);
		if (response.ok) {
			const result: Month = await response.json();
			return result;
		}
	} catch (error) {
		throw new Error('cannot select this month');
	}
};
