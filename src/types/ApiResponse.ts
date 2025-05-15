export type ApiResponse<T> = {
  success: string;
  data: T;
  msg?: string;
};