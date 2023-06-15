import { useMutation } from 'react-query';
import { URL_RESTAURANT } from '../constants/api';
import { UserData } from '../types/signup';

export const createUser = async (userData: UserData) => {
	const endpoint = `${URL_RESTAURANT}/user/signup`;
	try {
		const rawResponse = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		const result: { token: string } = await rawResponse.json();
		return result;
	} catch (error) {
		throw new Error('something went wrong');
	}
};
export const useCreateUser = () => {
	return useMutation(createUser);
};
