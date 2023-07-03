import React from 'react';
import styles from './createRestaurant.module.css';
import LoadingButton from '../../loadingButton/loadingButton';
import RestaurantForm from '../restaurantForm/restaurantForm';
import { useCreateRestaurant } from '../../../api/createRestaurant';
import { useRedirect } from '../../../hooks/useRedirect';
import { toast } from 'react-toastify';

function CreateRestaurant() {
	const navigate = useRedirect();
	const { mutateAsync, isLoading } = useCreateRestaurant();

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					Veuillez <b>créer votre resto</b>
				</p>
			</div>
			<RestaurantForm
				action={
					<div className={styles.btn}>
						<LoadingButton isLoading={isLoading}>créer</LoadingButton>
					</div>
				}
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
					const { _id } = res;
					navigate(`${_id}/menu`);
				}}
			/>
		</div>
	);
}

export default CreateRestaurant;
