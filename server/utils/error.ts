export type ApiError = {
  title: string;
  detail: string;
  status: number;
  errors?: {
    field: string;
    issue: string;
  }[];
};
    