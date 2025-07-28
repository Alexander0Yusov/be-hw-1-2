import { db } from '../../db/in-memory.db';
import { PostInputDto } from '../dto/post-input.dto';
import { Post } from '../types/post';

export const postsRepository = {
  findAll(): Post[] {
    return db.posts;
  },

  findById(id: string): Post | null {
    const foundPost = db.posts.find((p) => p.id === id);
    if (!foundPost) {
      return null;
    }
    return foundPost;
  },

  create(data: PostInputDto): Post {
    const newPost: Post = {
      id: `${new Date().getTime()}`,
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
      blogName: 'default blogName by blogId',
    };

    db.posts.push(newPost);
    return newPost;
  },

  update(id: string, dto: PostInputDto): Post | null {
    const postIndex = db.posts.findIndex((p) => p.id === id);

    if (postIndex === -1) {
      return null;
    }

    db.posts[postIndex].title = dto.title;
    db.posts[postIndex].shortDescription = dto.shortDescription;
    db.posts[postIndex].content = dto.content;
    db.posts[postIndex].blogId = dto.blogId;
    db.posts[postIndex].blogName = 'default blogName by blogId';

    return { ...db.posts[postIndex] };
  },

  delete(id: string): Post | null {
    const postIndex = db.posts.findIndex((p) => p.id === id);

    if (postIndex === -1) {
      return null;
    }

    const deletedPost = { ...db.posts[postIndex] };
    db.posts.splice(postIndex, 1);

    return deletedPost;
  },
};
