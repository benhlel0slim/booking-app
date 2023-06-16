export type ReservationError = {
	cod?: number;
	message: { message: string };
};
export type Error = {
	cod?: number;
	message: { message: string };
};
export type Response<T> = T | Error;
