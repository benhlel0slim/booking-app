import { useMutation } from 'react-query';
import { RestaurantData } from '../types/createRestaurant';
import { URL_RESTAURANT } from '../constants/api';
import { useRecoilValue } from 'recoil';
import { decodedToken } from '../store/authentication';
import { DecodeAuthToken } from '../types/auth';

type Payload = Omit<RestaurantData, 'menu'>;

export const createRestaurant = async (
	restaurantData: Payload,
	token: DecodeAuthToken | undefined
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
		const result: RestaurantData = await rawResponse.json();
		return result;
	} catch (error) {
		throw new Error('something went wrong');
	}
};

export const useCreateRestaurant = () => {
	const token = useRecoilValue(decodedToken);
	return useMutation((payload: Payload) => createRestaurant(payload, token));
};