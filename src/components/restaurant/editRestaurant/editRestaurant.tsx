import React from 'react';
import styles from './editRestaurant.module.css';
import LoadingButton from '../../loadingButton/loadingButton';
import RestaurantForm from '../restaurantForm/restaurantForm';
import { useQuery } from 'react-query';
import { getRestaurant } from '../../../api/getRestaurant';
import { useEditRestaurant } from '../../../api/editRestaurant';
import { CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditRestaurant() {
	const navigate = useNavigate();
	const { restaurantId } = useParams();
	const { data } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);

	const { mutateAsync, isLoading } = useEditRestaurant(restaurantId || '');
	if (!data)
		return (
			<div className={styles.circularProgress}>
				<CircularProgress />
			</div>
		);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					Modifier <b> votre resto</b>
				</p>
			</div>
			<RestaurantForm
				action={
					<div className={styles.btn}>
						<LoadingButton isLoading={isLoading}>enregister</LoadingButton>
					</div>
				}
				defaultValues={data}
				saveCallback={async (Payload) => {
					const res = await mutateAsync(Payload);
					if ('cod' in res) {
						const message = res.message.message;
						toast(`Erreur, veuillez réessayer ${message ?? ''}`, {
							position: 'bottom-right',
							type: 'error',
							autoClose: 5000,
						});
						return;
					}
					navigate(`admin/restaurant/${restaurantId}/reservation`);
				}}
			/>
			<div className={styles.btn}></div>
		</div>
	);
}

export default EditRestaurant;
