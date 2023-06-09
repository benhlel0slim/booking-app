import { useMutation } from 'react-query';
import { URL_RESTAURANT } from '../constants/api';
import { Signup } from '../types/signup';

export const createSignup = async (signup: Signup) => {
	const endpoint = `${URL_RESTAURANT}/user/signup`;
	try {
		const rawResponse = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(signup),
		});
		const content: Signup = await rawResponse.json();
		return content;
	} catch (error) {
		throw new Error('something went wrong');
	}
};
export const useCreateSignup = () => {
	return useMutation(createSignup);
};
