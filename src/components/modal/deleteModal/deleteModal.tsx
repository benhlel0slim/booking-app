import styles from './deleteModale.module.css';
import { Box, Modal } from '@mui/material';
import ReservationForm from '../../reservation/reservationForm/reservationForm';
import LoadingButton from '../../loadingButton/loadingButton';
import { getRestaurantReservation } from '../../../api/getReservation';
import { useRecoilValue } from 'recoil';
import { token } from '../../../store/authentication';
import { useQuery } from 'react-query';
import { useDeleteReservation } from '../../../api/deleteReservation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4,
};

type Props = {
  openModal: boolean;
  onClose: () => void;
  id: string;
  refetch: () => Promise<unknown>;
};

function DeleteModal({ openModal, onClose, id, refetch }: Props) {
  const _token = useRecoilValue(token);

  const { data } = useQuery(`${id}-reservation-detail`, () =>
    getRestaurantReservation(id || '', _token)
  );
  const { mutateAsync, isLoading } = useDeleteReservation(id || '');

  if (!data) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <Modal open={openModal} onClose={onClose}>
        <Box sx={style}>
          <ReservationForm
            title={
              <div className={styles.title}>
                <p>
                  Details <b>de la resérvation</b>
                </p>
              </div>
            }
            action={
              <div className={styles.ModalBtn}>
                <LoadingButton isLoading={isLoading}>SUPPRIMER</LoadingButton>
              </div>
            }
            defaultValues={data}
            saveCallback={async () => {
              await mutateAsync();
              onClose();
              refetch();
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}
export default DeleteModal;
