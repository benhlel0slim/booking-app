import Button from '@mui/material/Button';
import styles from './reservation.module.css';
import { useParams, useSearchParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateReservation } from '../../api/createReservation';
import { getKeyValuesFromUrlSearchParam } from '../../utils/searchParams';

const schema = yup
	.object({
		name: yup.string().required(),
		email: yup.string().email().required(),
		phone: yup.string().required(),
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

	const { mutate } = useCreateReservation();
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
		await mutate(newData);
		onNextPage();
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					Confirmer la <b>reservation</b>
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.forms}>
					<TextField
						required
						id="Nom et Prenom"
						label="Nom Prenom"
						placeholder="Nom prenom"
						variant="standard"
						{...register('name', {
							required: 'Le Nom et le PreNom sont obligatoires',
						})}
						error={Boolean(errors.name)}
						helperText={errors.name?.message}
					/>
					<TextField
						required
						id="Email"
						label="E-mail"
						type="e-mail"
						autoComplete="current-email"
						variant="standard"
						{...register('email', {
							required: 'Votre Email est obligatoire',
							pattern: {
								value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
								message: 'email incorrect',
							},
						})}
						error={Boolean(errors.email)}
						helperText={errors.email?.message}
					/>
					<TextField
						required
						id="Phone number"
						label="Numero de Telephone"
						type="numeric"
						variant="standard"
						{...register('phone', {
							required: 'Votre Numero est obligatoire',
							pattern: {
								value: /[0-9]{8}/,
								message: 'Numero incorrect',
							},
						})}
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
