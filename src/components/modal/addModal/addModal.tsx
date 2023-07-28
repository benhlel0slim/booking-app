import { Box, Modal } from '@mui/material';
import ReservationForm from '../../reservation/reservationForm/reservationForm';
import { toast } from 'react-toastify';
import { useCreateRestaurantReservation } from '../../../api/createAdminReservation';
import LoadingButton from '../../loadingButton/loadingButton';
import { CreateEvent } from '../../../types/event';
import styles from './addModal.module.css';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	p: 4,
};

type Props = {
	openModal: boolean;
	onClose: () => void;
	refetch: () => Promise<unknown>;
};

function AddModal({ openModal, onClose, refetch }: Props) {
	const { mutateAsync, isLoading } = useCreateRestaurantReservation();

	return (
		<div className={styles.modal}>
			<Modal open={openModal} onClose={onClose}>
				<Box sx={style}>
					<ReservationForm
						title={
							<div className={styles.title}>
								<p>
									Nouvelle <b>resérvation</b>
								</p>
							</div>
						}
						action={
							<div className={styles.ModalBtn}>
								<LoadingButton isLoading={isLoading}>AJOUTER</LoadingButton>
							</div>
						}
						saveCallback={async (adminReservation: CreateEvent) => {
							const res = await mutateAsync(adminReservation);
							if ('cod' in res) {
								const message = res.message.message;
								toast(`Erreur, veuillez réessayer ${message ?? ''}`, {
									position: 'bottom-right',
									type: 'error',
									autoClose: 5000,
								});
								return;
							}
							onClose();
							refetch();
						}}
					/>
				</Box>
			</Modal>
		</div>
	);
}
export default AddModal;
