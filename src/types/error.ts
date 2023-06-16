export type ReservationError = {
	cod?: number;
	message: { message: string };
};
export type ResponseWithError<T> = T | Error;
