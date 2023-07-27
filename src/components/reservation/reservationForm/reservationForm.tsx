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
import { CreateEvent } from '../../../types/event';
import { PHONE_REG_EXP } from '../../../constants/phoneRegExp';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
		endDate: yup.date(),
		duration: yup.string(),
		menu: yup.string().required(),
		guests: yup.number().required(),
	})
	.required();

type FormData = yup.InferType<typeof schema>;

type Props = {
	saveCallback: (adminReservation: CreateEvent) => void;
	defaultValues?: Partial<CreateEvent>;
	action: ReactNode;
	title: ReactNode;
};

function ReservationForm({
	defaultValues,
	action,
	saveCallback,
	title,
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
			duration: data.duration || 'court',
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
			{title}
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
								value={dayjs(field.value)}
							/>
						</LocalizationProvider>
					);
				}}
			/>
			{defaultValues ? (
				<Controller
					control={control}
					name="endDate"
					render={({ field }) => {
						return (
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateTimeField
									required
									label="jour de reservation et horaire"
									variant="standard"
									helperText={errors.endDate?.message}
									InputLabelProps={{ shrink: true }}
									{...field}
									onChange={(value) => field.onChange(value)}
									value={dayjs(field.value)}
								/>
							</LocalizationProvider>
						);
					}}
				/>
			) : (
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
			)}
			<FormControl variant="standard">
				<InputLabel>Menus</InputLabel>
				<Controller
					control={control}
					name="menu"
					render={({ field }) => {
						return (
							<Select
								aria-label="Menu for the restaurant"
								error={Boolean(errors.menu)}
								{...field}
								onChange={(e) => field.onChange(e.target.value)}
							>
								{menuList}
							</Select>
						);
					}}
				/>
			</FormControl>
			<FormControl variant="standard">
				<InputLabel>Nombre d'invités</InputLabel>
				<Controller
					control={control}
					name="guests"
					render={({ field }) => {
						return (
							<Select
								label="guests"
								variant="standard"
								error={Boolean(errors.guests)}
								{...field}
								onChange={(e) => field.onChange(e.target.value)}
							>
								{Array.from({ length: 8 }, (_, i) => i + 1).map((value) => (
									<MenuItem key={value} value={value}>
										{value}
									</MenuItem>
								))}
							</Select>
						);
					}}
				/>
			</FormControl>
			{action}
		</form>
	);
}

export default ReservationForm;
