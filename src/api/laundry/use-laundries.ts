import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Laundry } from './types';

type Response = Laundry[];
type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useLaundries = createQuery<Response, Variables, AxiosError>({
  queryKey: ['laundries'],
  fetcher: async () => {
    try {
      const response = await client.get(`laundries`);
      const laundries = response.data;
      return Array.isArray(laundries) && laundries.length > 0 ? laundries : [];
    } catch (error) {
      const axiosError = error as AxiosError;
      // Log detailed error information for debugging
      console.error(
        'Error fetching laundries:',
        axiosError.message,
        axiosError.response?.data
      );

      // Optionally, re-throw the error to be handled by useQuery's error state:
      throw axiosError;

      // OR, if you want to return a default value on error (e.g., an empty array):
      // return [];
    }
  },
});
