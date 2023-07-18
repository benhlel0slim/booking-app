import styles from './adminReservation.module.css';
import LoadingButton from '../../loadingButton/loadingButton';
import 'react-calendar-timeline/lib/Timeline.css';
import Timeline from 'react-calendar-timeline';
import { useParams } from 'react-router-dom';
import { getAllRestaurantReservations } from '../../../api/getReservations';
import { useRecoilValue } from 'recoil';
import { token } from '../../../store/authentication';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from 'react-query';
import { getRestaurant } from '../../../api/getRestaurant';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Box, Modal } from '@mui/material';
import ReservationForm from '../reservationForm/reservationForm';
import { toast } from 'react-toastify';
import { useCreateRestaurantReservation } from '../../../api/createAdminReservation';
import { Event } from '../../../types/event';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	p: 4,
};

function AdminReservation() {
	const { restaurantId } = useParams();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const { data: reservations, refetch } = useQuery(
		`${restaurantId}-reservation`,
		() => getAllRestaurantReservations(restaurantId || '', _token)
	);
	const { data: restaurant } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);

	const { mutateAsync, isLoading } = useCreateRestaurantReservation();
	const _token = useRecoilValue(token);

	if (!reservations) {
		return (
			<div className={styles.circularProgress}>
				<CircularProgress />
			</div>
		);
	}

	const groups = Array(restaurant?.slots || 0)
		.fill('')
		.map((_, i) => ({ id: i + 1, title: `Table  ${i + 1}` }));

	const items = reservations.map(
		({ startDate, _id: id, endDate, name: title, group }) => {
			return {
				id,
				group,
				title,
				start_time: dayjs(startDate).toDate(),
				end_time: dayjs(endDate).toDate(),
			};
		}
	);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					Vos <b>reservations</b>
				</p>
			</div>
			<div className={styles.btn}>
				<LoadingButton onClick={handleOpen}>Ajouter</LoadingButton>
				<Modal open={open} onClose={handleClose}>
					<Box sx={style}>
						<ReservationForm
							action={
								<div className={styles.ModalBtn}>
									<LoadingButton isLoading={isLoading}>AJOUTER</LoadingButton>
								</div>
							}
							saveCallback={async (adminReservation: Event) => {
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
								await refetch();
								handleClose();
							}}
						/>
					</Box>
				</Modal>
			</div>
			<div className={styles.timelineCalendar}>
				<Timeline
					groups={groups}
					items={items}
					defaultTimeStart={new Date()}
					defaultTimeEnd={dayjs().add(7, 'day').toDate()}
				></Timeline>
			</div>
		</div>
	);
}

export default AdminReservation;
