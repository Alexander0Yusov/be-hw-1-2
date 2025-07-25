import { Blog } from '../1-blogs/types/blog';

export const db: {
  blogs: Blog[];
  //   posts: TPost[];
} = {
  blogs: [
    {
      id: '1',
      name: 'myBlog',
      description: 'so interest',
      websiteUrl: 'http://localhost:5001/api/blogs2',
    },
    {
      id: '2',
      name: 'myBlog2',
      description: 'so interest 2',
      websiteUrl: 'http://localhost:5001/api/blogs3',
    },
  ],
  //   posts: [],
};
