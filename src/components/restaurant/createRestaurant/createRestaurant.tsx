import React from 'react';
import styles from './createRestaurant.module.css';
import LoadingButton from '../../loadingButton/loadingButton';
import RestaurantForm from '../restaurantForm/restaurantForm';
import { useCreateRestaurant } from '../../../api/createRestaurant';

function CreateRestaurant() {
	const { mutateAsync } = useCreateRestaurant();

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					Veuillez <b>créer votre resto</b>
				</p>
			</div>
			<RestaurantForm saveCallback={mutateAsync} />
			<div className={styles.btn}>
				<LoadingButton>créer</LoadingButton>
			</div>
		</div>
	);
}

export default CreateRestaurant;
