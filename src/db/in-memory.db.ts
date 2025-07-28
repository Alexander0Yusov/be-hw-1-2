import { Blog } from '../1-blogs/types/blog';
import { Post } from '../2-posts/types/post';

export const db: {
  blogs: Blog[];
  posts: Post[];
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
  posts: [
    {
      id: '1',
      title: 'post title',
      shortDescription: 'some description',
      content: 'some content',
      blogId: '1',
      blogName: 'blogname1',
    },
    {
      id: '2',
      title: 'post title',
      shortDescription: 'some description',
      content: 'some content',
      blogId: '2',
      blogName: 'blogname2',
    },
  ],
};
