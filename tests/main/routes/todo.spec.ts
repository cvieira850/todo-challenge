import { InvalidParamError, RequiredFieldError } from '@/application/errors'
import { Todo } from '@/infra/pg/entities'
import { PgConnection } from '@/infra/pg/helpers'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/../tests/infra/pg/mocks'

import { IBackup } from 'pg-mem'
import request from 'supertest'

describe('Todo routes', () => {
  let backup: IBackup
  let connection: PgConnection

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([Todo])
    backup = db.backup()
  })
  beforeEach(() => {
    backup.restore()
  })
  afterAll(async () => {
    await connection.disconnect()
  })

  describe('POST /todos', () => {
    it('should return 200 with todo', async () => {
      const { status, body } = await request(app)
        .post('/api/todos')
        .send({ name: 'user', weight: 1 })

      expect(status).toBe(200)
      expect(body.name).toBe('user')
      expect(body.weight).toBe(1)
    })

    it('should return 400 with InvalidPararError', async () => {
      await request(app)
        .post('/api/todos')
        .send({ name: 'user', weight: '1' })
        .expect(400, { error: new InvalidParamError('weight').message })

      await request(app)
        .post('/api/todos')
        .send({ name: 2, weight: 1 })
        .expect(400, { error: new InvalidParamError('name').message })
    })

    it('should return 400 with RequiredFieldError', async () => {
      await request(app)
        .post('/api/todos')
        .send({ weight: 1 })
        .expect(400, { error: new RequiredFieldError('name').message })

      await request(app)
        .post('/api/todos')
        .send({ name: 'user' })
        .expect(400, { error: new RequiredFieldError('weight').message })
    })
  })

  describe('GET /todos', () => {
    it('Should return 200 with todos', async () => {
      await request(app)
        .post('/api/todos')
        .send({ name: 'user', weight: 1 })
      await request(app)
        .post('/api/todos')
        .send({ name: 'admin', weight: 2 })

      const { status, body } = await request(app)
        .get('/api/todos')

      expect(status).toBe(200)
      expect(body.length).toBe(2)
      expect(body[0].id).toBe(1)
      expect(body[0].name).toBe('user')
      expect(body[0].weight).toBe(1)
      expect(body[1].id).toBe(2)
      expect(body[1].name).toBe('admin')
      expect(body[1].weight).toBe(2)
    })

    it('Should return 401 if load todos fails', async () => {
      const { status, body } = await request(app)
        .get('/api/todos')

      expect(status).toBe(401)
      expect(body.error).toBe('Unauthorized')
    })
  })

  describe('GET /todos/:todoId', () => {
    it('Should return 200 with todo', async () => {
      await request(app)
        .post('/api/todos')
        .send({ name: 'user', weight: 1 })

      const { status, body } = await request(app)
        .get('/api/todos/1')

      expect(status).toBe(200)
      expect(body.id).toBe('1')
      expect(body.name).toBe('user')
      expect(body.weight).toBe(1)
      expect(body.created_at).toBeDefined()
    })

    it('Should return 201 if dont have a todo with this todoId', async () => {
      const { status, body } = await request(app)
        .get('/api/todos/1')

      expect(status).toBe(201)
      expect(body).toBeNull()
    })
  })

  describe('PUT /todos/:todoId', () => {
    it('Should return 200 with todo', async () => {
      await request(app)
        .post('/api/todos')
        .send({ name: 'user', weight: 1 })

      const { status, body } = await request(app)
        .put('/api/todos/1')
        .send({ name: 'admin', weight: 2 })

      expect(status).toBe(200)
      expect(body.id).toBe('1')
      expect(body.name).toBe('admin')
      expect(body.weight).toBe(2)
      expect(body.created_at).toBeDefined()
    })

    it('Should return 201 if dont have a todo with this todoId', async () => {
      const { status, body } = await request(app)
        .get('/api/todos/1')

      expect(status).toBe(201)
      expect(body).toBeNull()
    })
  })

  describe('PUT /todos/:todoId', () => {
    it('Should return 201 on success', async () => {
      await request(app)
        .post('/api/todos')
        .send({ name: 'user', weight: 1 })

      const { status, body } = await request(app)
        .delete('/api/todos/1')

      expect(status).toBe(201)
      expect(body).toBeNull()
    })

    it('Should return 401 if dont have a todo with this todoId', async () => {
      const { status, body } = await request(app)
        .delete('/api/todos/1')

      expect(status).toBe(401)
      expect(body).toEqual({ error: 'Unauthorized' })
    })
  })
})
