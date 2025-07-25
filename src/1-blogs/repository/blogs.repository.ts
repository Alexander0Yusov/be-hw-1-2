import { db } from '../../db/in-memory.db';
import { BlogInputDto } from '../dto/blogInputDto';
import { Blog } from '../types/blog';

export const blogsRepository = {
  findAll(): Blog[] {
    return db.blogs;
  },

  findById(id: string): Blog | null {
    const foundBlog = db.blogs.find((b) => b.id === id);
    if (!foundBlog) {
      return null;
    }
    return foundBlog;
  },

  create(newBlog: Blog): Blog {
    db.blogs.push(newBlog);
    return newBlog;
  },

  update(id: string, dto: BlogInputDto): void {
    const blog = db.blogs.find((b) => b.id === id);

    if (!blog) {
      throw new Error('Blog not exist');
    }

    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.websiteUrl;
    return;
  },

  delete(id: string): void {
    const index = db.blogs.findIndex((b) => b.id === id);

    if (index === -1) {
      throw new Error('Blog not exist');
    }

    db.blogs.splice(index, 1);
    return;
  },
};
