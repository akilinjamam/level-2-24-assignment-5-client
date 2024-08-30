/* eslint-disable @typescript-eslint/no-explicit-any */
export type TResponse<T> = {
  data: T;
  error?: any;
  meta?: any;
};
