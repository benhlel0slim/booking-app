import React, { useState } from 'react';
import styles from './signupForm.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCreateSignup } from '../../../api/createSignup';

const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
const schema = yup
	.object({
		name: yup.string().required('Le Nom et le Prenom sont obligatoires'),
		email: yup
			.string()
			.email('email incorrect')
			.required('Votre Email est obligatoire'),
		password: yup
			.string()
			.matches(passwordRegExp, 'mot de passe invalide')
			.required('Votre mot de passe est obligatoire'),
		confirmPassword: yup
			.string()
			.required()
			.oneOf(
				[yup.ref('password')],
				'Les deux mots de passe ne correspondent pas'
			),
	})
	.required();
type FormData = yup.InferType<typeof schema>;

function SignupForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowConfirmPassword = () =>
		setShowConfirmPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});
	const { mutateAsync } = useCreateSignup();
	const onSubmit = async (data: FormData) => {
		const user = await mutateAsync(data);
		console.log(user);
	};
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					Veuillez <b>créer un compte</b>
				</p>
			</div>
			<form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.input}>
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
						label="e-mail"
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
						type={showPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
						variant="standard"
						{...register('password')}
						error={Boolean(errors.password)}
						helperText={errors.password?.message}
					/>
					<TextField
						required
						label="Ressaisir le mot de passe"
						type={showConfirmPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={handleClickShowConfirmPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
						variant="standard"
						{...register('confirmPassword')}
						error={Boolean(errors.confirmPassword)}
						helperText={errors.confirmPassword?.message}
					/>
				</div>
				<div className={styles.btn}>
					<Button type="submit" variant="contained">
						ENREGISTER
					</Button>
				</div>
				<div className={styles.link}>
					<Link to="/admin/login">Ou se connecter</Link>
				</div>
			</form>
		</div>
	);
}

export default SignupForm;
