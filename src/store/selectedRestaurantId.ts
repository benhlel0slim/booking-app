import { selector } from 'recoil';
import { decodedToken } from './authentication';

export const firstRestaurantId = selector<string | undefined>({
	key: 'first-restaurantId',
	get: ({ get }) => {
		const _decodedToken = get(decodedToken);
		if (!_decodedToken) {
			return;
		}
		if (_decodedToken.restaurants.length === 0) {
			return;
		}
		return _decodedToken.restaurants[0];
	},
});
