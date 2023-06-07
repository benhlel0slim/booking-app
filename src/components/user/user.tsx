import React from 'react';
import styles from './user.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useCreateUser } from '../../api/createUser';

const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
const schema = yup
	.object({
		email: yup
			.string()
			.email('email incorrect')
			.required('Votre Email est obligatoire'),
		password: yup
			.string()
			.matches(passwordRegExp, 'mot de passe invalide')
			.required('Votre mot de passe est obligatoire'),
	})
	.required();
type FormData = yup.InferType<typeof schema>;

function User() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});
	const { mutateAsync } = useCreateUser();
	const onSubmit = async (data: FormData) => {
		const user = await mutateAsync(data);
		console.log(user);
	};
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					Veuillez <b>vous connecter</b>
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.forms}>
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
						label="mot de passe"
						type="numeric"
						variant="standard"
						{...register('password')}
						error={Boolean(errors.password)}
						helperText={errors.password?.message}
					/>
				</div>
				<div className={styles.btn}>
					<Button type="submit" variant="contained">
						SE CONNECTER
					</Button>
				</div>
			</form>
		</div>
	);
}

export default User;
