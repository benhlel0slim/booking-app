import { useMutation } from 'react-query';
import { User } from '../types/user';
import { URL_RESTAURANT } from '../constants/api';

const loginUser = async (user: User) => {
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
		const response: { token: string } = await rawResponse.json();
		return response;
	} catch (error) {
		throw new Error('something went wrong');
	}
};
export const useLoginUser = () => {
	return useMutation(loginUser);
};
