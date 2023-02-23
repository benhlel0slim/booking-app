import { Link, Outlet, useParams } from 'react-router-dom';
import { getRestaurant } from '../../api/getRestaurant';
import { useQuery } from 'react-query';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './layout.module.css';
import { LinkIcon } from '../linkIcon/linkIcon';

function Layout() {
	const { restaurantId } = useParams();
	const { data } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);

	return (
		<div>
			<div className={styles.navbar}>
				<p>
					Reservation au Resto
					<span className={styles.restaurantName}>{` ${data?.name}`}</span>
				</p>
			</div>
			<div className={styles.main}>
				<Outlet />
			</div>
			<div className={styles.footer}>
				<ul className={styles.linkWrapper}>
					<h3>Restaurant</h3>
					<Link to="/admin/signup">Créer un compte</Link>
					<li>
						<Link to="/admin/login">Se connecter</Link>
					</li>
				</ul>
				<ul className={styles.linkWrapper}>
					<h3>A propos</h3>
					<LinkIcon
						name="Nous contactez"
						link="https://github.com/benhlel0slim"
					/>
					<LinkIcon name="Feedback" link="https://github.com/benhlel0slim" />
					<LinkIcon
						name="Developed by"
						link="https://github.com/benhlel0slim"
					/>
				</ul>
				<Logo className={styles.logo} />
			</div>
		</div>
	);
}
export default Layout;
