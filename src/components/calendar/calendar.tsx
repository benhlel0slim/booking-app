import CalendarComponent, { Detail } from 'react-calendar';
import { useQueries } from 'react-query';
import { getMonth } from '../../api/getMonth';
import { useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './calendar.module.css';
import dayjs from 'dayjs';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getKeyValuesFromUrlSearchParam } from '../../utils/searchParams';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { maxDate } from '../../constants/maxDate';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const months = [month, month + 1, month + 2];

export function Calendar() {
  const { restaurantId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const durationInit = searchParams.get('duration');
  const dayInit = searchParams.get('day');
  const monthInit = searchParams.get('month');
  const yearInit = searchParams.get('year');

  const [date, setDate] = useState(
    dayInit && monthInit && yearInit
      ? new Date(Number(yearInit), Number(monthInit), Number(dayInit))
      : new Date()
  );
  const [type, setType] = useState(durationInit || 'short');

  const onNextPage = (time: string) => {
    setSearchParams({
      ...getKeyValuesFromUrlSearchParam(searchParams),
      step: 'condition',
      duration: type,
      time,
      year: dayjs(date).format('YYYY'),
      month: dayjs(date).format('MM'),
      day: dayjs(date).format('DD'),
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const monthData = useQueries(
    months.map((m) => ({
      queryKey: ['month', m],
      queryFn: () => getMonth(restaurantId || '', m, year),
    }))
  );

  function tileClassName({ date, view }: { date: Date; view: Detail }) {
    const index = months.indexOf(date.getMonth());
    const _currentMonth = monthData[index]?.data;
    if (view === 'month' && _currentMonth) {
      const keys = Object.keys(_currentMonth);
      const isAvailable = keys.includes(date.getDate().toString());
      return isAvailable ? 'green' : 'red';
    }
    return '';
  }

  const index = months.indexOf(date.getMonth());
  const times = monthData[index].data?.[date.getDate()];
  const reservationTime = times?.map((time) => {
    const currentTime = dayjs(time).format('HH:mm');
    return (
      <div className={styles.reservationTime}>
        <button
          data-cy="add-time"
          className={styles.button}
          onClick={() => onNextPage(currentTime)}
        >
          {currentTime}
        </button>
      </div>
    );
  });
  if (
    monthData[0].status !== 'success' ||
    monthData[1].status !== 'success' ||
    monthData[2].status !== 'success'
  ) {
    return (
      <div className={styles.skeletonWrapper}>
        <h2 className={styles.skeletonTitle}>
          <Skeleton />
        </h2>

        <p>
          <Skeleton className={styles.skeletonCalendar} />
        </p>
        <h2 className={styles.skeleton}>
          <Skeleton />
        </h2>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <CalendarComponent
        data-cy="calendar-component"
        onChange={setDate}
        value={date}
        minDate={new Date()}
        maxDate={new Date(maxDate)}
        tileClassName={tileClassName}
        locale="fr-FR"
      />
      <div className={styles.legends}>
        <div className={styles.legendGreen} />
        <p>Horaires disponibles</p>
        <div className={styles.legendRed} />
        <p>Pas d'heures disponibles</p>
      </div>
      <div className={styles.text}>
        <p>
          veuillez <b>choisir </b>
        </p>
      </div>
      <div className={styles.selectWrapper}>
        <Select
          data-cy="input-duration"
          className={styles.select}
          value={type}
          size="small"
          onChange={handleChange}
        >
          <MenuItem value="long">Long</MenuItem>
          <MenuItem value="short">Court</MenuItem>
        </Select>
      </div>

      {reservationTime || 'Indisponible pour Reservation'}
    </div>
  );
}
