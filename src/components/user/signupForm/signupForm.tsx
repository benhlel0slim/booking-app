import React, { useState } from 'react';
import styles from './signupForm.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUser } from '../../../api/createUser';
import { passwordRegExp } from '../../../constants/passwordRegExp';
import { toast } from 'react-toastify';

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
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
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
	const { mutateAsync } = useCreateUser();
	const onSubmit = async (data: FormData) => {
		const res = await mutateAsync(data);
		if ('cod' in res) {
			toast('Erreur, veuillez réessayer', {
				position: 'bottom-right',
				type: 'error',
				autoClose: 5000,
			});
		} else {
			toast('Compte créer avec succès', {
				position: 'bottom-right',
				type: 'success',
				autoClose: 5000,
			});
			navigate('/admin/login');
		}
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
