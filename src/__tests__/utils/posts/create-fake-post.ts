import { PostInputDto } from '../../../2-posts/dto/post-input.dto';

const testPostData: PostInputDto = {
  title: 'fake title',
  shortDescription: 'fake description',
  content: 'fake content',
  blogId: 'fakeid',
};

export const createFakePost = (post?: PostInputDto) => {
  let newPost = testPostData;

  if (post) {
    newPost = {
      ...post,
    };
  }

  return newPost;
};
