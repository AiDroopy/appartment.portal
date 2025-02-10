import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Laundry } from './types';

type Variables = {
  apartmentId: string;
  startTime: string;
  endTime: string;
  note?: string;
};

type Response = Laundry;

export const useAddLaundry = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'laundries',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
