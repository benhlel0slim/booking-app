import Button from '@mui/material/Button';
import styles from './reservation.module.css';
import { useParams, useSearchParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateReservation } from '../../../api/createReservation';
import { getKeyValuesFromUrlSearchParam } from '../../../utils/searchParams';
import { toast } from 'react-toastify';
import { PHONE_REG_EXP } from '../../../constants/phoneRegExp';

const schema = yup
  .object({
    name: yup.string().required('Le Nom et le Prenom sont obligatoires'),
    email: yup
      .string()
      .email('email incorrect')
      .required('Votre Email est obligatoire'),
    phone: yup
      .string()
      .matches(PHONE_REG_EXP, 'Numero incorrect')
      .required('Votre numero est obligatoire'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export function Reservation() {
  const { restaurantId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const time = searchParams.get('time');
  const guests = searchParams.get('guest');
  const menu = searchParams.get('menu');
  const day = searchParams.get('day');
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  const duration = searchParams.get('duration');
  const onNextPage = () => {
    setSearchParams({
      ...getKeyValuesFromUrlSearchParam(searchParams),
      step: 'confirmation',
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { mutateAsync } = useCreateReservation();
  const onSubmit = async (data: FormData) => {
    if (!duration || !menu || !time || !guests || !restaurantId) {
      return;
    }
    const newData = {
      ...data,
      guests: Number(guests),
      duration,
      time,
      year: Number(year),
      menu,
      month: Number(month),
      day: Number(day),
      restaurant: restaurantId,
    };
    const res = await mutateAsync(newData);
    if ('cod' in res) {
      toast(res.message.message, {
        position: 'bottom-right',
        type: 'error',
        autoClose: 5000,
      });
    } else onNextPage();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>
          Confirmer la <b>reservation</b>
        </p>
      </div>

      <form data-cy="form-reservation" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.forms}>
          <TextField
            data-cy="input-name"
            required
            label="Nom Prenom"
            placeholder="Nom prenom"
            variant="standard"
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            data-cy="input-mail"
            required
            label="E-mail"
            type="e-mail"
            autoComplete="current-email"
            variant="standard"
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            data-cy="input-phone"
            required
            label="Numero de Telephone"
            type="numeric"
            variant="standard"
            {...register('phone')}
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
          />
        </div>
        <div className={styles.btn}>
          <Button type="submit" variant="contained">
            Confirmer
          </Button>
        </div>
      </form>
    </div>
  );
}
