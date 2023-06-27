import React from 'react';
import styles from './editRestaurant.module.css';
import LoadingButton from '../../loadingButton/loadingButton';
import RestaurantForm from '../restaurantForm/restaurantForm';
import { useQuery } from 'react-query';
import { getRestaurant } from '../../../api/getRestaurant';
import { useRecoilValue } from 'recoil';
import { firstRestaurantId } from '../../../store/selectedRestaurantId';
import { useEditRestaurant } from '../../../api/editRestaurant';
import { CircularProgress } from '@mui/material';

function EditRestaurant() {
	const restaurantId = useRecoilValue(firstRestaurantId);
	const { data } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);

	const { mutateAsync } = useEditRestaurant(restaurantId || '');
	if (!data)
		return (
			<div className={styles.circularProgress}>
				<CircularProgress />
			</div>
		);
	console.log(data);
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					Modifier <b> votre resto</b>
				</p>
			</div>
			<RestaurantForm saveCallback={mutateAsync} defaultValues={data} />
			<div className={styles.btn}>
				<LoadingButton>enregistrer</LoadingButton>
			</div>
		</div>
	);
}

export default EditRestaurant;
