export type ResponseError = {
  cod: number;
  message: { message: string };
};
export type ResponseWithError<T> = T | ResponseError;
