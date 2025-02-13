import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Variables = { id: number; title: string; body: string; userId: number };
type Response = Post;

export const useUpdatePost = createMutation<Response, Variables, AxiosError>({
  // Renamed to useUpdatePost
  mutationFn: async (variables) => {
    const { id, ...rest } = variables; // Extract id from variables
    if (!id) {
      throw new Error('Post ID is required for update'); // Throw error if id is missing
    }
    return client({
      url: `posts/${id}`, // Include id in the URL
      method: 'PUT', // Change method to PUT
      data: rest, // Send the remaining data
    }).then((response) => response.data);
  },
});
