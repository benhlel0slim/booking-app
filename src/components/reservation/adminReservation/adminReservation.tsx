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
import { useRedirect } from '../../../hooks/useRedirect';
import AddModal from '../../modal/addModal/addModal';
import DeleteModal from '../../modal/deleteModal/deleteModal';

function AdminReservation() {
	const { restaurantId } = useParams();
	const _token = useRecoilValue(token);

	const [isOpen, setIsOpen] = useState(false);
	const handleClick = () => setIsOpen(!isOpen);

	const [isOpenDelete, setIsOpenDelete] = useState(false);
	const handleClickDelete = () => setIsOpenDelete(!isOpenDelete);

	const [id, setId] = useState('');

	const { data: reservations, refetch } = useQuery(
		`${restaurantId}-reservation`,
		() => getAllRestaurantReservations(restaurantId || '', _token)
	);

	const { data: restaurant } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);

	useRedirect();

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
				<LoadingButton onClick={handleClick}>Ajouter</LoadingButton>
				{isOpen && (
					<AddModal openModal onClose={handleClick} refetch={refetch} />
				)}
			</div>
			<div className={styles.timelineCalendar}>
				<Timeline
					onItemClick={(id: string) => {
						handleClickDelete();
						setId(id);
					}}
					groups={groups}
					items={items}
					defaultTimeStart={new Date()}
					defaultTimeEnd={dayjs().add(7, 'day').toDate()}
					canMove={false}
				></Timeline>
				{isOpenDelete && (
					<DeleteModal
						id={id}
						openModal
						onClose={handleClickDelete}
						refetch={refetch}
					/>
				)}
			</div>
		</div>
	);
}

export default AdminReservation;
