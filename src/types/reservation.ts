/** Reservation data to be sent to the BE */
export interface Reservation {
	restaurant: string;
	duration: string;
	time: string;
	year: number;
	month: number;
	day: number;
	email: string;
	phone: string;
	menu: string;
	name: string;
	guests: number;
}

/** Reservation data returned by the BE */
export interface ReservationData {
	group: number;
	startDate: Date;
	endDate: Date;
	name: string;
	menu: string;
	email: string;
	phone: number;
	restaurant: string;
	guests: number;
	_id: string;
}
