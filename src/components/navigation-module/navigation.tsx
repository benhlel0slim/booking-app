import { useSearchParams } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import styles from './navigation.module.css';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getKeyValuesFromUrlSearchParam } from '../../utils/searchParams';

export const Navigation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const time = searchParams.get('time');
  const guest = searchParams.get('guest');
  const menu = searchParams.get('menu');
  const day = searchParams.get('day');
  const month = searchParams.get('month');
  const year = searchParams.get('year');

  const handleClick = (step: 'guest' | 'menu' | 'calendar') => {
    setSearchParams({
      ...getKeyValuesFromUrlSearchParam(searchParams),
      step,
    });
  };

  return (
    <div className={styles.container}>
      {guest && (
        <button className={styles.btn} onClick={() => handleClick('guest')}>
          <GroupIcon className={styles.icons} />
          {guest}
        </button>
      )}

      {menu && (
        <button className={styles.btn} onClick={() => handleClick('menu')}>
          <RestaurantMenuIcon className={styles.icons} />
          {menu}
        </button>
      )}

      {time && (
        <button className={styles.btn} onClick={() => handleClick('calendar')}>
          <CalendarMonthIcon className={styles.icons} />
          {day} {month} {year}, {time}
        </button>
      )}
    </div>
  );
};
