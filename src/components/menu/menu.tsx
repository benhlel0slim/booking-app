import { useParams } from 'react-router-dom';
import styles from './menu.module.css';

export function Menu() {
	useParams();

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					veuillez <b> Choisir le menu</b>
				</p>
			</div>

			{/* <Button onClick={onNextPage} variant="contained">
				Suivant
			</Button> */}
		</div>
	);
}
