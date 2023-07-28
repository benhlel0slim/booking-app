import { useParams, useSearchParams } from 'react-router-dom';
import styles from './confirmation.module.css';
import { useQuery } from 'react-query';
import { getRestaurant } from '../../api/getRestaurant';

export function Confirmation() {
  const { restaurantId } = useParams();
  const { data } = useQuery(`restaurant-${restaurantId}`, () =>
    getRestaurant(restaurantId || '')
  );
  const [searchParams] = useSearchParams();
  const time = searchParams.get('time');
  const day = searchParams.get('day');

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>
          <b>Reservation</b> confirmée
        </p>
      </div>
      <div className={styles.text}>
        <p>
          Cher invité,
          <br />
          <br /> Votre reservation pour le {`${day}`} à {`${time}`} a bien été
          confirmée.
          <br /> <br />
          Cordialement,
          <br />
          <br /> {` ${data?.name}.`}
        </p>
      </div>
    </div>
  );
}
