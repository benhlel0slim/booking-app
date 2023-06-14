import { useMutation } from 'react-query';
import { RestaurantData } from '../types/createRestaurantData';
import { URL_RESTAURANT } from '../constants/api';

export const createRestaurant = async (restaurantData: RestaurantData) => {
	const endpoint = `${URL_RESTAURANT}/restaurant`;
	try {
		const rawResponse = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
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
