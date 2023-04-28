export interface FieldError {
  [key: string]: string[];
}

export interface SuccessResponse<T> {
  success: boolean;
  message: string;
  data: T | undefined;
  path: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[]
}
