import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Laundry } from './types';

type Variables = { id: string };
type Response = Laundry;

export const useLaundry = createQuery<Response, Variables, AxiosError>({
  queryKey: ['laundries'],
  fetcher: (variables) => {
    return client
      .get(`laundries/${variables.id}`)
      .then((response) => response.data);
  },
});
