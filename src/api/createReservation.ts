import { Reservation, ReservationData } from '../types/reservation';
import { URL_RESTAURANT } from '../constants/api';
import { useMutation } from 'react-query';
import { ResponseWithError } from '../types/error';

/**
 * Post reservation data
 * `useMutation`
 */
const createReservation = async (reservation: Reservation) => {
  const endpoint = `${URL_RESTAURANT}/reservation`;
  try {
    const rawResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });
    const content: ResponseWithError<ReservationData> =
      await rawResponse.json();
    return content;
  } catch (error) {
    throw new Error('something went wrong, the reservation was not sent');
  }
};

export const useCreateReservation = () => {
  return useMutation(createReservation);
};
