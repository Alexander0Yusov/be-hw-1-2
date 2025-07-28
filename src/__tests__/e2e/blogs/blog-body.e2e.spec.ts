import request from 'supertest';
import express from 'express';
import { setupApp } from '../../../setup-app';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { createFakeBlog } from '../../utils/blogs/create-fake-blog';
import { BLOGS_PATH, TESTING_PATH } from '../../../core/paths/paths';
import { generateBasicAuthToken } from '../../utils/generateBasicAuthToken';

describe('Blog API body validation check', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await request(app)
      .delete(TESTING_PATH + '/all-data')
      .expect(HttpStatus.NoContent);
  });

  it(`❌ should not create blog when incorrect body passed; POST /api/blogs'`, async () => {
    await request(app)
      .post(BLOGS_PATH)
      .send(createFakeBlog())
      .expect(HttpStatus.Unauthorized);

    const invalidDataSet1 = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send(
        createFakeBlog({
          name: '     ', // empty string
          description: '    ', // empty string
          websiteUrl: '    ', // empty string + invalid format
        }),
      )
      .expect(HttpStatus.BadRequest);
    expect(invalidDataSet1.body.errorsMessages).toHaveLength(4);

    const invalidDataSet2 = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send(
        createFakeBlog({
          name: '0'.repeat(16), // more than max symbols
          description: '0'.repeat(501),
          websiteUrl: 'http://localhost:5001/api/blogs2' + '0'.repeat(101), // incorrect url in regex
        }),
      )
      .expect(HttpStatus.BadRequest);
    expect(invalidDataSet2.body.errorsMessages).toHaveLength(4);

    const invalidDataSet3 = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send(
        createFakeBlog({
          // @ts-ignore
          name: 123, // incorrect type
          // @ts-ignore
          description: 123, // incorrect type
          websiteUrl: '123qwerty', // incorrect url in regex
        }),
      )
      .expect(HttpStatus.BadRequest);
    expect(invalidDataSet3.body.errorsMessages).toHaveLength(1);

    // check что никто не создался
    const blogListResponse = await request(app)
      .get(BLOGS_PATH)
      .set('Authorization', generateBasicAuthToken());
    expect(blogListResponse.body).toHaveLength(0);
  });
});
