import { useMutation } from 'react-query';
import { User } from '../types/user';
import { URL_RESTAURANT } from '../constants/api';

export const createUser = async (user: User) => {
	const endpoint = `${URL_RESTAURANT}/user/login`;
	try {
		const rawResponse = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		const content: User = await rawResponse.json();
		return content;
	} catch (error) {
		throw new Error('something went wrong');
	}
};
export const useCreateUser = () => {
	return useMutation(createUser);
};
