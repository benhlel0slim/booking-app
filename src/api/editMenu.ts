import { useMutation } from 'react-query';
import { Menu } from '../types/payload';
import { ResponseWithError } from '../types/error';
import { URL_RESTAURANT } from '../constants/api';
import { useRecoilValue } from 'recoil';
import { token } from '../store/authentication';

const editMenu = async (menu: Menu, restaurantId: string, token: string) => {
	const endpoint = `${URL_RESTAURANT}/restaurant/${restaurantId}`;
	try {
		const rawResponse = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(menu),
		});
		const content: ResponseWithError<Menu> = await rawResponse.json();
		return content;
	} catch (error) {
		throw new Error('something went wrong, the reservation was not sent');
	}
};

export const useEditMenu = (restaurantId: string) => {
	const _token = useRecoilValue(token);
	return useMutation((menu: Menu) => editMenu(menu, restaurantId, _token));
};
