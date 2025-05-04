import { TFetchOptions } from 'lib/api';

export type Pagination = {
  startCursor: string | null;
  PreviousPage: number;
  NextPage: number;
  endCursor: string | null;
};

export type TOptionsProps = {
  options?: TFetchOptions;
};