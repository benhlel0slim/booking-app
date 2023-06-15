import React, { useState } from 'react';
import styles from './loginForm.module.css';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useLoginUser } from '../../../api/loginUser';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { passwordRegExp } from '../../../constants/passwordRegExp';
import { useSetRecoilState } from 'recoil';
import AuthToken from '../../../store/authentication';
import NavigateButton from '../../button.tsx/button';

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

function LoginForm() {
	const setAuthUserToken = useSetRecoilState(AuthToken);
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
	const { mutateAsync, status } = useLoginUser();
	const onSubmit = async (data: FormData) => {
		const response = await mutateAsync(data);

		console.log('response login', response);
		if (response && response.token) {
			setAuthUserToken(response.token);
			/* localStorage.setItem('token', response.token); */
			// navigate to main screen
			// decode token && save user data
		} else console.log('something went wrong');
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					Veuillez <b>vous connecter</b>
				</p>
			</div>
			<form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.input}>
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
										aria-label="toggle password visibility"
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
				</div>
				<div className={styles.btn}>
					<NavigateButton title="SE CONNECTER" statu={status} />
				</div>
				<div className={styles.link}>
					<Link to="/admin/signup">Ou Créer un compte</Link>
				</div>
				<div className={styles.link}>
					<Link to="">
						Login as a <b>Demo User</b>
					</Link>
				</div>
			</form>
		</div>
	);
}

export default LoginForm;
