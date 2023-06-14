import { useMutation } from 'react-query';
import { RestaurantData } from '../types/createRestaurantData';
import { URL_RESTAURANT } from '../constants/api';

export const createRestaurant = async (
	restaurantData: Omit<RestaurantData, 'menu'>
) => {
	const endpoint = `${URL_RESTAURANT}/admin/restaurant`;
	const token = localStorage.getItem('token');
	try {
		const rawResponse = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(restaurantData),
		});
		const content: RestaurantData = await rawResponse.json();
		return content;
	} catch (error) {
		throw new Error('something went wrong');
	}
};
export const useCreateRestaurant = () => {
	return useMutation(createRestaurant);
};
