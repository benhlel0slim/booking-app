import { URL_RESTAURANT } from '../constants/api';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { token } from '../store/authentication';
import { RestaurantData } from '../types/createRestaurant';
import { Payload } from '../types/payload';
import { ResponseWithError } from '../types/error';

export const editRestaurant = async (
	restaurantData: Payload,
	restaurantId: string,
	token: string
) => {
	const endpoint = `${URL_RESTAURANT}/restaurant/${restaurantId}`;
	try {
		const rawResponse = await fetch(endpoint, {
			method: 'PUT',
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
		throw new Error('restaurant not edited');
	}
};

export const useEditRestaurant = (restaurantId: string) => {
	const _token = useRecoilValue(token);
	return useMutation((restaurantData: Payload) =>
		editRestaurant(restaurantData, _token, restaurantId)
	);
};
