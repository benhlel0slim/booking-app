import { useMutation } from 'react-query';
import { RestaurantData } from '../types/createRestaurant';
import { URL_RESTAURANT } from '../constants/api';
import { useRecoilValue } from 'recoil';
import { token } from '../store/authentication';
import { Payload } from '../types/payload';
import { ResponseWithError } from '../types/error';

export const createRestaurant = async (
	restaurantData: Payload,
	token: string
) => {
	const endpoint = `${URL_RESTAURANT}/restaurant`;
	/* const token = localStorage.getItem('token'); */
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
		const result: ResponseWithError<RestaurantData> = await rawResponse.json();
		return result;
	} catch (error) {
		throw new Error('something went wrong');
	}
};

export const useCreateRestaurant = () => {
	const _token = useRecoilValue(token);
	return useMutation((payload: Payload) => createRestaurant(payload, _token));
};
