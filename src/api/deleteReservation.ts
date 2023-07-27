import { URL_RESTAURANT } from '../constants/api';

export const deleteReservation = async (id: string, token: string) => {
	const endpoint = `${URL_RESTAURANT}/event/${id}`;
	try {
		const response = await fetch(endpoint, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			const result: Promise<{ message: string }> = await response.json();
			return result;
		}
	} catch (error) {
		throw new Error('Cannot delete reservation');
	}
};
