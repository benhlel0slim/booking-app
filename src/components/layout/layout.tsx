import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { getRestaurant } from '../../api/getRestaurant';
import { useQuery } from 'react-query';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as NavIcon } from '../../assets/navIcon.svg';
import styles from './layout.module.css';
import { LinkIcon } from '../linkIcon/linkIcon';
import { useRecoilValue } from 'recoil';
import { token } from '../../store/authentication';

function Layout() {
  const { restaurantId } = useParams();
  const _token = useRecoilValue(token);
  const { data: restaurant } = useQuery(`restaurant-${restaurantId}`, () =>
    getRestaurant(restaurantId || '')
  );

  return (
    <div>
      {restaurant && _token ? (
        <div className={styles.adminNavbar}>
          <NavIcon />
          <NavLink
            to={`/admin/restaurant/${restaurantId}/reservation`}
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? 'bold' : '',
                color: isPending ? '' : 'black',
              };
            }}
          >
            <p>Reservations</p>
          </NavLink>
          <NavLink
            to={`admin/restaurant/${restaurantId}/edit`}
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? 'bold' : '',
                color: isPending ? '' : 'black',
              };
            }}
          >
            <p>mon resto</p>
          </NavLink>
          <NavLink
            to={`/admin/restaurant/${restaurantId}/menu`}
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? 'bold' : '',
                color: isPending ? '' : 'black',
              };
            }}
          >
            <p>menu</p>
          </NavLink>
        </div>
      ) : (
        <div className={styles.clientNavbar}>
          <p>
            <b>Reservation au Resto</b>
            <span
              className={styles.restaurantName}
            >{` ${restaurant?.name}`}</span>
          </p>
        </div>
      )}
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
