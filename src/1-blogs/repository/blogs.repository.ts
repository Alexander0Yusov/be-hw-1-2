import { db } from '../../db/in-memory.db';
import { BlogInputDto } from '../dto/blog-input.dto';
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

  create(data: BlogInputDto): Blog {
    const newBlog: Blog = {
      id: `${new Date().getTime()}`,
      name: data.name,
      description: data.description,
      websiteUrl: data.websiteUrl,
    };

    db.blogs.push(newBlog);
    return newBlog;
  },

  update(id: string, dto: BlogInputDto): Blog | null {
    const blogIndex = db.blogs.findIndex((b) => b.id === id);

    if (blogIndex === -1) {
      return null;
    }

    db.blogs[blogIndex].name = dto.name;
    db.blogs[blogIndex].description = dto.description;
    db.blogs[blogIndex].websiteUrl = dto.websiteUrl;

    return { ...db.blogs[blogIndex] };
  },

  delete(id: string): Blog | null {
    const blogIndex = db.blogs.findIndex((b) => b.id === id);

    if (blogIndex === -1) {
      return null;
    }

    const deletedBlog = { ...db.blogs[blogIndex] };
    db.blogs.splice(blogIndex, 1);

    return deletedBlog;
  },
};
