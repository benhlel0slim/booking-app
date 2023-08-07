import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getRestaurant } from '../../api/getRestaurant';
import { useQuery } from 'react-query';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as NavIcon } from '../../assets/navIcon.svg';
import styles from './layout.module.css';
import { LinkIcon } from '../linkIcon/linkIcon';
import { navLinkStyle } from '../../constants/navLinkStyle';
import Logout from '../user/logout/logout';
import { useRecoilValue } from 'recoil';
import { firstRestaurantId } from '../../store/selectedRestaurantId';

function Layout() {
  const { restaurantId } = useParams();
  const selectedRestaurantId = useRecoilValue(firstRestaurantId);
  let location = useLocation();
  const { data: restaurant } = useQuery(`restaurant-${restaurantId}`, () =>
    getRestaurant(restaurantId || '')
  );
  return (
    <div>
      <div className={styles.navbar}>
        <NavIcon className={styles.navIcon} />
        {location.pathname.includes('admin/restaurant') && (
          <div className={styles.logout}>
            <Logout />
          </div>
        )}
        {selectedRestaurantId && restaurant?.menu && (
          <div className={styles.adminNavbar}>
            <NavLink
              to={`/admin/restaurant/${selectedRestaurantId}/reservation`}
              style={navLinkStyle}
            >
              <p>Reservations</p>
            </NavLink>
            <NavLink
              to={`admin/restaurant/${restaurantId}/edit`}
              style={navLinkStyle}
            >
              <p>mon resto</p>
            </NavLink>
            <NavLink
              to={`/admin/restaurant/${restaurantId}/menu`}
              style={navLinkStyle}
            >
              <p>menu</p>
            </NavLink>
          </div>
        )}

        {location.pathname.startsWith('/restaurant') && (
          <p>
            <b>Reservation au Resto</b>
            <span
              className={styles.restaurantName}
            >{` ${restaurant?.name}`}</span>
          </p>
        )}
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
