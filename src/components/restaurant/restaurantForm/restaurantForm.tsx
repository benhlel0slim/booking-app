import React, { useState } from 'react';
import styles from './restaurantForm.module.css';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Theme,
	useTheme,
} from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DAYS_OF_WEEK } from '../../../constants/daysOfWeek';
import { useRedirect } from '../../../hooks/useRedirect';
import { RestaurantData } from '../../../types/createRestaurant';
import { Payload } from '../../../types/payload';

function getStyles(day: string, closedDays: string[], theme: Theme) {
	return {
		fontWeight:
			closedDays.indexOf(day) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

const schema = yup
	.object({
		name: yup.string().required(),
		address: yup.object({
			city: yup.string().required(),
			street: yup.string().required(),
		}),
		slots: yup.number().required(),
		times: yup.object({
			open: yup.string().required(),
			closed: yup.string().required(),
		}),
		closedDays: yup.array().of(yup.string().required()).required(),
	})
	.required();

type FormData = yup.InferType<typeof schema>;

type Props = {
	defaultValues?: Partial<Payload>;
	saveCallback: (payload: Payload) => Promise<RestaurantData>;
};

function RestaurantForm({ saveCallback, defaultValues }: Props) {
	const [tables, setTables] = useState(
		defaultValues?.slots ? String(defaultValues.slots) : ''
	);
	const handleChangeTables = (event: SelectChangeEvent) => {
		setTables(event.target.value);
	};

	const theme = useTheme();

	const [closedDays, setClosedDays] = useState<string[]>(
		defaultValues?.closedDays ?? []
	);
	const handleChangeClosedDays = (
		event: SelectChangeEvent<typeof closedDays>
	) => {
		const {
			target: { value },
		} = event;
		setClosedDays(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues,
	});
	const onSubmit = async (data: FormData) => {
		await saveCallback(data);
	};
	useRedirect();

	return (
		<form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
			<TextField
				required
				label="Nom du resto"
				placeholder="Nom du resto"
				variant="standard"
				{...register('name')}
				error={Boolean(errors.name)}
				helperText={errors.name?.message}
			/>
			<TextField
				required
				label="Ville"
				placeholder="Ville"
				variant="standard"
				{...register('address.city')}
				error={Boolean(errors.address?.city)}
				helperText={errors.address?.city?.message}
			/>
			<TextField
				required
				label="Rue"
				placeholder="Rue"
				variant="standard"
				{...register('address.street')}
				error={Boolean(errors.address?.street)}
				helperText={errors.address?.street?.message}
			/>
			<FormControl variant="standard" sx={{ m: 1, width: 200 }}>
				<InputLabel>Jours de fermeture</InputLabel>
				<Select
					label="Jours de fermeture"
					multiple
					value={closedDays}
					{...register('closedDays')}
					error={Boolean(errors.closedDays)}
					onChange={handleChangeClosedDays}
				>
					{DAYS_OF_WEEK.map((day, index) => (
						<MenuItem
							key={day}
							value={(index + 1).toString()}
							style={getStyles(day, closedDays, theme)}
						>
							{day}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl variant="standard" sx={{ m: 1, width: 200 }}>
				<InputLabel>Nombre de tables</InputLabel>
				<Select
					required
					label="Nombre de table"
					{...register('slots')}
					error={Boolean(errors.slots)}
					value={tables}
					onChange={handleChangeTables}
				>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={15}>15</MenuItem>
					<MenuItem value={20}>20</MenuItem>
				</Select>
			</FormControl>
			<div className={styles.inputs}>
				<div className={styles.ouverture}>
					<TextField
						required
						label="Ouverture"
						type="time"
						variant="standard"
						{...register('times.open')}
						error={Boolean(errors.times?.open)}
						helperText={errors.times?.open?.message}
					/>
				</div>
				<div className={styles.fermeture}>
					<TextField
						required
						label="Fermeture"
						type="time"
						variant="standard"
						{...register('times.closed')}
						error={Boolean(errors.times?.closed)}
						helperText={errors.times?.closed?.message}
					/>
				</div>
			</div>
		</form>
	);
}

export default RestaurantForm;
