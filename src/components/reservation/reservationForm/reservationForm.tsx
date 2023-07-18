import React, { ReactNode } from 'react';
import styles from './reservationForm.module.css';
import {
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getRestaurant } from '../../../api/getRestaurant';
import dayjs from 'dayjs';
import { Event } from '../../../types/event';
import { PHONE_REG_EXP } from '../../../constants/phoneRegExp';
import { DateTimeField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const schema = yup
	.object({
		name: yup.string().required(),
		email: yup
			.string()
			.email('email incorrect')
			.required('Votre Email est obligatoire'),
		phone: yup
			.string()
			.matches(PHONE_REG_EXP, 'Numero incorrect')
			.required('Votre numero est obligatoire'),
		startDate: yup.date().required(),
		duration: yup.string().required(),
		menu: yup.string().required(),
		guests: yup.number().required(),
	})
	.required();

type FormData = yup.InferType<typeof schema>;

type Props = {
	saveCallback: (adminReservation: Event) => void;
	defaultValues?: Partial<Event>;
	action: ReactNode;
};

function ReservationForm({
	defaultValues = { guests: 1 },
	action,
	saveCallback,
}: Props) {
	const { restaurantId } = useParams();
	const { data } = useQuery(`restaurant-${restaurantId}`, () =>
		getRestaurant(restaurantId || '')
	);

	const { menu: restaurantsMenus } = data ?? {};
	const menuList = restaurantsMenus?.map((item) => (
		<MenuItem key={item} value={item}>
			{item}
		</MenuItem>
	));

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues,
	});

	const onSubmit = (data: FormData) => {
		if (!restaurantId) {
			return;
		}
		saveCallback({
			...data,
			restaurant: restaurantId,
			time: dayjs(data.startDate).format('HH:mm'),
		});
	};

	if (!data)
		return (
			<div className={styles.circularProgress}>
				<CircularProgress />
			</div>
		);

	return (
		<form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
			<p className={styles.title}>
				Nouvelle <b>resérvation</b>
			</p>
			<TextField
				required
				label="Nom Prenom"
				placeholder="Nom prenom"
				variant="standard"
				{...register('name')}
				error={Boolean(errors.name)}
				helperText={errors.name?.message}
			/>
			<TextField
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
				required
				label="Numero de Telephone"
				type="numeric"
				variant="standard"
				{...register('phone')}
				error={Boolean(errors.phone)}
				helperText={errors.phone?.message}
			/>
			<Controller
				control={control}
				name="startDate"
				render={({ field }) => {
					return (
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimeField
								required
								label="jour de reservation et horaire"
								variant="standard"
								helperText={errors.startDate?.message}
								InputLabelProps={{ shrink: true }}
								{...field}
								onChange={(value) => field.onChange(value)}
							/>
						</LocalizationProvider>
					);
				}}
			/>
			<FormControl variant="standard">
				<InputLabel shrink={true}>Durée</InputLabel>
				<Select
					required
					label="durée"
					{...register('duration')}
					error={Boolean(errors.duration)}
				>
					<MenuItem value="short">Court</MenuItem>
					<MenuItem value="long">Long</MenuItem>
				</Select>
			</FormControl>
			<FormControl variant="standard">
				<InputLabel>Menus</InputLabel>
				<Select
					aria-label="Menu for the restaurant"
					{...register('menu')}
					error={Boolean(errors.menu)}
				>
					{menuList}
				</Select>
			</FormControl>
			<FormControl variant="standard">
				<InputLabel>Nombre d'invités</InputLabel>
				<Select
					label="guests"
					variant="standard"
					{...register('guests')}
					error={Boolean(errors.guests)}
				>
					<MenuItem value={1}>un</MenuItem>
					<MenuItem value={2}>deux</MenuItem>
					<MenuItem value={3}>trois</MenuItem>
					<MenuItem value={4}>quatre</MenuItem>
					<MenuItem value={5}>cinq</MenuItem>
					<MenuItem value={6}>six</MenuItem>
					<MenuItem value={7}>sept</MenuItem>
					<MenuItem value={8}>huit</MenuItem>
				</Select>
			</FormControl>
			{action}
		</form>
	);
}

export default ReservationForm;
