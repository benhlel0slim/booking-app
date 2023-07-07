import styles from './adminReservation.module.css';
import LoadingButton from '../../loadingButton/loadingButton';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import Timeline from 'react-calendar-timeline';
import { useParams } from 'react-router-dom';
import { getAllRestaurantReservations } from '../../../api/getAllRestaurantReservations';
import { useRecoilValue } from 'recoil';
import { token } from '../../../store/authentication';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from 'react-query';
import { getRestaurant } from '../../../api/getRestaurant';
import dayjs from 'dayjs';

function AdminReservation() {
	const { restaurantId } = useParams();
	const _token = useRecoilValue(token);
	const { data: reservations } = useQuery(`${restaurantId}-reservation`, () =>
		getAllRestaurantReservations(restaurantId || '', _token)
	);
	const { data: restaurant } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);

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

	console.log(groups);

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
				<LoadingButton>Ajouter</LoadingButton>
			</div>
			<div className={styles.timelineCalendar}>
				<Timeline
					groups={groups}
					items={items}
					defaultTimeStart={moment().add(-12, 'hour')}
					defaultTimeEnd={moment().add(12, 'hour')}
				></Timeline>
			</div>
		</div>
	);
}

export default AdminReservation;
