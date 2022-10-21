import { UpdateTodoService } from '@/data/services'
import { LoadTodoByIdRepository, UpdateTodoRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'
import { InvalidRequestError } from '@/data/errors'

describe('UpdateTodoService', () => {
  let sut: UpdateTodoService
  let todoRepo: MockProxy<LoadTodoByIdRepository & UpdateTodoRepository>
  let id: string
  let name: string
  let weight: number
  let created_at: Date
  let new_name: string
  let new_weight: number

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    new_name = 'new_name'
    new_weight = 2
    todoRepo = mock()
    todoRepo.loadById.mockResolvedValue({
      id,
      name,
      weight,
      created_at
    })
    todoRepo.update.mockResolvedValue({
      id,
      name: new_name,
      weight: new_weight,
      created_at
    })
  })

  beforeEach(() => {
    sut = new UpdateTodoService(todoRepo)
  })

  describe('LoadTodoById Repository', () => {
    it('Should call LoadTodoByIdRepository with correct id', async () => {
      await sut.perform({ id })

      expect(todoRepo.loadById).toHaveBeenCalledWith({ id })
      expect(todoRepo.loadById).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if LoadTodoByIdRepository throws', async () => {
      todoRepo.loadById.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ id })

      await expect(promise).rejects.toThrow(new Error())
    })

    it('Should return an error if LoadTodoByIdRepository returns undefined', async () => {
      todoRepo.loadById.mockResolvedValueOnce(undefined)

      const promise = sut.perform({ id })

      await expect(promise).rejects.toThrow(new InvalidRequestError('Todo not found'))
    })
  })

  describe('UpdateTodoRepository', () => {
    it('Should call UpdateTodoRepository with correct values', async () => {
      await sut.perform({ id, name, weight })

      expect(todoRepo.update).toHaveBeenCalledWith({ id, name, weight })
      expect(todoRepo.update).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if UpdateTodoRepository throws', async () => {
      todoRepo.update.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ id })

      await expect(promise).rejects.toThrow(new Error())
    })

    it('Should return undefined if UpdateTodoRepository returns undefined', async () => {
      todoRepo.update.mockResolvedValueOnce(undefined)

      const result = await sut.perform({ id })

      expect(result).toBeUndefined()
    })

    it('Should return a todo on UpdateTodoRepository success', async () => {
      const result = await sut.perform({ id, name, weight })

      expect(result).toEqual({
        id,
        name: new_name,
        weight: new_weight,
        created_at: expect.any(Date)
      })
    })
  })
})
