import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Response = Post[];
type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const usePosts = createQuery<Response, Variables, AxiosError>({
  queryKey: ['posts'],
  fetcher: async () => {
    try {
      const response = await client.get(`posts`);
      const posts = response.data;
      return Array.isArray(posts) && posts.length > 0 ? posts : [];
    } catch (error) {
      const axiosError = error as AxiosError;
      // Log detailed error information for debugging
      console.error(
        'Error fetching posts:',
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
