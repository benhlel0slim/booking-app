import styles from './confirmation.module.css';

export function Confirmation() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>
					<b>Reservation</b> confirmée
				</p>
			</div>
			<div className={styles.text}>
				<p>
					Cher invité,
					<br />
					<br /> Votre reservation a bien été confirmée
					<br /> <br />
					Cordialement,
					<br />
					<br /> Chez Bibi
				</p>
			</div>
		</div>
	);
}
