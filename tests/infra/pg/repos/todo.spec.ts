import { PgTodoRepository } from '@/infra/pg/repos'
import { Todo } from '@/infra/pg/entities'
import { PgConnection } from '@/infra/pg/helpers'
import { makeFakeDb } from '../mocks'
import { PgRepository } from '@/infra/pg/repos/repository'

import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'

describe('PgTodoRepository', () => {
  let sut: PgTodoRepository
  let connection: PgConnection
  let pgTodoRepo: Repository<Todo>
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb()
    backup = db.backup()
    pgTodoRepo = connection.getRepository(Todo)
  })
  beforeEach(() => {
    backup.restore()
    sut = new PgTodoRepository()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('Should be an instance of PgRepository', () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('LoadTodoByNameRepository', () => {
    it('Should return a todo on loadByName success', async () => {
      await pgTodoRepo.save({ name: 'user', weight: 1 })

      const todo = await sut.loadByName({ name: 'user' })

      expect(todo).toEqual({ id: '1', name: 'user', weight: 1, created_at: expect.any(Date) })
    })

    it('Should return undefined if loadByName fails', async () => {
      const todo = await sut.loadByName({ name: 'user' })

      expect(todo).toBeUndefined()
    })
  })

  describe('AddTodoRepository', () => {
    it('Should return an todo on add success', async () => {
      const todo = await sut.add({ name: 'any_name', weight: 1 })

      expect(todo).toEqual({ id: '1', name: 'any_name', weight: 1, created_at: expect.any(Date) })
    })
  })

  describe('LoadTodosRepository', () => {
    it('Should return an array of todos on load success', async () => {
      await pgTodoRepo.save({ name: 'user', weight: 1 })
      await pgTodoRepo.save({ name: 'admin', weight: 2 })

      const todos = await sut.load(null)

      expect(todos).toEqual([
        { id: 1, name: 'user', weight: 1, created_at: expect.any(Date) },
        { id: 2, name: 'admin', weight: 2, created_at: expect.any(Date) }
      ])
    })

    it('Should return undefined if load fails', async () => {
      const todo = await sut.load(null)

      expect(todo).toBeUndefined()
    })
  })

  describe('LoadTodoByIdRepository', () => {
    it('Should return a todo on loadById', async () => {
      await pgTodoRepo.save({ name: 'user', weight: 1 })

      const user = await sut.loadById({ id: '1' })

      expect(user).toEqual({ id: '1', name: 'user', weight: 1, created_at: expect.any(Date) })
    })

    it('Should return undefined if loadById dont return a todo', async () => {
      const user = await sut.loadById({ id: '1' })

      expect(user).toBeUndefined()
    })
  })

  describe('UpdateTodoRepository', () => {
    it('Should return a todo on update success', async () => {
      await pgTodoRepo.save({ name: 'user', weight: 1 })

      const result = await sut.update({ id: '1', name: 'admin', weight: 2 })

      expect(result).toEqual({ id: '1', name: 'admin', weight: 2, created_at: expect.any(Date) })
    })

    it('Should return a todo on update success with only name passed', async () => {
      await pgTodoRepo.save({ name: 'user', weight: 1 })

      const result = await sut.update({ id: '1', name: 'admin' })

      expect(result).toEqual({ id: '1', name: 'admin', weight: 1, created_at: expect.any(Date) })
    })

    it('Should return a todo on update success with only weight passed', async () => {
      await pgTodoRepo.save({ name: 'user', weight: 1 })

      const result = await sut.update({ id: '1', weight: 2 })

      expect(result).toEqual({ id: '1', name: 'user', weight: 2, created_at: expect.any(Date) })
    })

    it('Should return undefined if cant load a todo', async () => {
      const result = await sut.update({ id: '1', name: 'admin', weight: 2 })

      expect(result).toBeUndefined()
    })
  })
  describe('DeleteTodoRepository', () => {
    it('Should return undefined on delete success', async () => {
      const result = await sut.delete({ id: '1' })

      expect(result).toBeUndefined()
    })
  })
})
