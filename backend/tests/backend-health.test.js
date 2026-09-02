const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../src/app');

test('GET /health responde ok', async () => {
  const res = await request(app).get('/health');
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(res.body, { status: 'ok' });
});

test('POST /health con cuerpo no declarado no rompe', async () => {
  const res = await request(app).post('/health').send({ foo: 'bar' });
  assert.ok(res.status === 404 || res.status === 200);
});

test('POST /generate/word devuelve docx', async () => {
  const res = await request(app)
    .post('/generate/word')
    .send({ data: { datosPersonales: { nombre: 'Test' }, perfil: {} } });
  assert.strictEqual(res.status, 200);
  assert.match(res.headers['content-type'], /wordprocessingml/);
});

test('POST /generate/pdf con datos invalidos da 400', async () => {
  const res = await request(app).post('/generate/pdf').send({ data: { foo: 'bar' } });
  assert.strictEqual(res.status, 400);
});

test('POST /generate/word con datos invalidos da 400', async () => {
  const res = await request(app).post('/generate/word').send({});
  assert.strictEqual(res.status, 400);
});