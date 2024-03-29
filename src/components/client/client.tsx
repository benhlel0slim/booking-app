import { useSearchParams } from 'react-router-dom';
import { Calendar } from '../calendar/calendar';
import { Condition } from '../condition/condition';
import { Confirmation } from '../confirmation/confirmation';
import { Guest } from '../guest/guest';
import { Menu } from '../menu/clientMenu/clientMenu';
import { Reservation } from '../reservation/clientReservation/reservation';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from 'react-query';
import { getRestaurant } from '../../api/getRestaurant';
import { useParams } from 'react-router-dom';
import { Navigation } from '../navigation-module/navigation';
import styles from './client.module.css';

function Client() {
  const { restaurantId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step');
  const { data } = useQuery(`restaurant-${restaurantId}`, () =>
    getRestaurant(restaurantId || '')
  );

  useEffect(() => {
    if (!step) setSearchParams({ step: 'guest' });
  }, [setSearchParams, step]);

  if (!data) {
    return (
      <div className={styles.circularProgress}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {<Navigation />}
      {step === 'guest' && <Guest />}
      {step === 'menu' && <Menu />}
      {step === 'calendar' && <Calendar />}
      {step === 'condition' && <Condition />}
      {step === 'reservation' && <Reservation />}
      {step === 'confirmation' && <Confirmation />}
    </>
  );
}
export default Client;
