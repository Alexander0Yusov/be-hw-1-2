import request from 'supertest';
import express from 'express';
import { setupApp } from '../../../setup-app';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { POSTS_PATH, TESTING_PATH } from '../../../core/paths/paths';
import { generateBasicAuthToken } from '../../utils/generateBasicAuthToken';
import { createFakePost } from '../../utils/posts/create-fake-post';
import { PostInputDto } from '../../../2-posts/dto/post-input.dto';

describe('Post API', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await request(app)
      .delete(TESTING_PATH + '/all-data')
      .expect(HttpStatus.NoContent);
  });

  it('should create post; POST posts', async () => {
    await request(app)
      .post(POSTS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send(createFakePost())
      .expect(HttpStatus.Created);
  });

  it('should return posts list; GET /posts', async () => {
    await request(app)
      .post(POSTS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send(createFakePost())
      .expect(HttpStatus.Created);
    await request(app)
      .post(POSTS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send(createFakePost())
      .expect(HttpStatus.Created);

    const postListResponse = await request(app)
      .get(POSTS_PATH)
      .expect(HttpStatus.Ok);

    expect(postListResponse.body).toBeInstanceOf(Array);
    expect(postListResponse.body.length).toBeGreaterThanOrEqual(2);
  });

  it('should return post by id; GET /posts/:id', async () => {
    const createResponse = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send(createFakePost())
      .expect(HttpStatus.Created);

    const getResponse = await request(app)
      .get(POSTS_PATH + '/' + `${createResponse.body.id}`)
      .expect(HttpStatus.Ok);

    expect(getResponse.body).toEqual(createResponse.body);
  });

  it('should update post; PUT /posts/:id', async () => {
    const createResponse = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send(createFakePost())
      .expect(HttpStatus.Created);

    const postUpdateData: PostInputDto = {
      title: 'some text',
      shortDescription: 'some description',
      content: 'some content',
      blogId: 'newid',
    };

    await request(app)
      .put(POSTS_PATH + '/' + `${createResponse.body.id}`)
      .set('Authorization', generateBasicAuthToken())
      .send(postUpdateData)
      .expect(HttpStatus.NoContent);

    const response = await request(app).get(
      POSTS_PATH + '/' + `${createResponse.body.id}`,
    );

    expect(response.body).toEqual({
      ...postUpdateData,
      id: createResponse.body.id,
      blogName: createResponse.body.blogName,
    });
  });

  it('DELETE /posts/:id and check after NOT FOUND', async () => {
    const createResponse = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send(createFakePost())
      .expect(HttpStatus.Created);

    await request(app)
      .delete(POSTS_PATH + '/' + `${createResponse.body.id}`)
      .set('Authorization', generateBasicAuthToken())
      .expect(HttpStatus.NoContent);

    const response = await request(app).get(
      POSTS_PATH + '/' + `${createResponse.body.id}`,
    );

    expect(response.status).toBe(HttpStatus.NotFound);
  });
});
