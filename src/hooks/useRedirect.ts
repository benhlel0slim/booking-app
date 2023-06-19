import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { decodedToken } from '../store/authentication';
import { getRestaurant } from '../api/getRestaurant';
import { useEffect } from 'react';

export const useRedirect = () => {
	const tokenData = useRecoilValue(decodedToken);
	const navigate = useNavigate();

	const redirect = async () => {
		if (!tokenData) {
			navigate('/admin/login');
			return;
		}
		if (tokenData.restaurants.length === 0) {
			navigate('/admin/restaurant');
			return;
		}

		const restaurantId = tokenData.restaurants[0];
		const restaurant = await getRestaurant(restaurantId);

		if (restaurant?.menu.length === 0) {
			navigate('/admin/restaurant/:id/menu');
			return;
		} else {
			navigate('admin/restaurant/:id/reservation');
			return;
		}
	};

	useEffect(() => {
		redirect();
	}, []);
};
