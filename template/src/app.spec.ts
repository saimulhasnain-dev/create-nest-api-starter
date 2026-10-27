import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './app.module';
import { setupApp } from './setup';
import { validateEnv } from './config';

describe('app', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const mod = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = mod.createNestApplication();
    setupApp(app);
    await app.init();
  });
  afterAll(() => app.close());

  it('GET /health', () => request(app.getHttpServer()).get('/health').expect(200).expect((r) => expect(r.body.status).toBe('ok')));

  it('creates, reads and deletes a user', async () => {
    const created = await request(app.getHttpServer()).post('/users').send({ name: 'Ada', email: 'ada@example.com' }).expect(201);
    await request(app.getHttpServer()).get(`/users/${created.body.id}`).expect(200);
    await request(app.getHttpServer()).delete(`/users/${created.body.id}`).expect(204);
    await request(app.getHttpServer()).get(`/users/${created.body.id}`).expect(404);
  });

  it('rejects invalid body with 400 and the uniform error shape', () =>
    request(app.getHttpServer()).post('/users').send({ name: '', email: 'nope', extra: 1 }).expect(400).expect((r) => {
      expect(r.body.error.statusCode).toBe(400);
      expect(r.body.error.message.length).toBeGreaterThan(0);
    }));

  it('returns 409 for a duplicate email', async () => {
    await request(app.getHttpServer()).post('/users').send({ name: 'B', email: 'dup@example.com' }).expect(201);
    await request(app.getHttpServer()).post('/users').send({ name: 'B', email: 'dup@example.com' }).expect(409);
  });

  it('unknown routes return the uniform 404', () => request(app.getHttpServer()).get('/nope').expect(404).expect((r) => expect(r.body.error.statusCode).toBe(404)));

  it('env validation lists all problems', () => {
    expect(() => validateEnv({ PORT: 'x', NODE_ENV: 'weird' })).toThrow(/NODE_ENV[\s\S]*PORT/);
  });
});
