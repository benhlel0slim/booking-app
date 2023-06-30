import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { decodedToken } from '../store/authentication';
import { getRestaurant } from '../api/getRestaurant';
import { useEffect } from 'react';
import { firstRestaurantId } from '../store/selectedRestaurantId';
import { useQuery } from 'react-query';

export const useRedirect = () => {
	const navigate = useNavigate();
	let location = useLocation();
	const tokenData = useRecoilValue(decodedToken);
	const restaurantId = useRecoilValue(firstRestaurantId);
	const { data } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);

	const redirect = async () => {
		if (!tokenData) {
			if (location.pathname !== '/admin/login') {
				navigate('/admin/login');
			}
			return;
		}
		if (!restaurantId) {
			if (location.pathname !== '/admin/restaurant') {
				navigate('/admin/restaurant');
			}
			return;
		}

		if (data?.menu.length === 0) {
			if (location.pathname !== `/admin/restaurant/${restaurantId}/menu`)
				navigate(`/admin/restaurant/${restaurantId}/menu`);
			return;
		} else {
			if (location.pathname !== `/admin/restaurant/${restaurantId}/reservation`)
				navigate(`/admin/restaurant/${restaurantId}/reservation`);
		}
	};
	useEffect(() => {
		redirect();
	}, [tokenData]);

	return navigate;
};
