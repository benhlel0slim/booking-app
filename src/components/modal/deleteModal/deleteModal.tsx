import styles from './deleteModale.module.css';
import { Box, Modal } from '@mui/material';
import ReservationForm from '../../reservation/reservationForm/reservationForm';
import LoadingButton from '../../loadingButton/loadingButton';
import { getRestaurantReservation } from '../../../api/getReservation';
import { useRecoilValue } from 'recoil';
import { token } from '../../../store/authentication';
import { useQuery } from 'react-query';
import { deleteReservation } from '../../../api/deleteReservation';

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
	id: string;
	refetch: () => void;
};

function DeleteModal({ openModal, onClose, id }: Props) {
	const _token = useRecoilValue(token);

	const { data } = useQuery(`${id}-reservation-detail`, () =>
		getRestaurantReservation(id || '', _token)
	);

	if (!data) {
		return null;
	}

	return (
		<div className={styles.modal}>
			<Modal open={openModal} onClose={onClose}>
				<Box sx={style}>
					<ReservationForm
						title={
							<div className={styles.title}>
								<p>
									Details <b>de la resérvation</b>
								</p>
							</div>
						}
						action={
							<div className={styles.ModalBtn}>
								<LoadingButton>SUPPRIMER</LoadingButton>
							</div>
						}
						defaultValues={data}
						saveCallback={async () => {
							await deleteReservation(id, _token);
							onClose();
						}}
					/>
				</Box>
			</Modal>
		</div>
	);
}
export default DeleteModal;
