import { AddTodoService } from '@/data/services'
import { LoadTodoByNameRepository, AddTodoRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddTodoService', () => {
  let sut: AddTodoService
  let todoRepo: MockProxy<LoadTodoByNameRepository & AddTodoRepository>
  let id: string
  let name: string
  let weight: number
  let created_at: Date

  beforeEach(() => {
    id = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    todoRepo = mock()
    todoRepo.loadByName.mockResolvedValue(undefined)
    todoRepo.add.mockResolvedValue({
      id,
      name,
      weight,
      created_at
    })
  })

  beforeEach(() => {
    sut = new AddTodoService(todoRepo)
  })

  describe('LoadTodoByNameRepository', () => {
    it('Should call LoadTodoByNameRepository with correct values', async () => {
      await sut.perform({ name, weight: 1 })

      expect(todoRepo.loadByName).toHaveBeenCalledWith({ name })
      expect(todoRepo.loadByName).toHaveBeenCalledTimes(1)
    })

    it('Should return undefined if LoadTodoByNameRepository returns an event', async () => {
      todoRepo.loadByName.mockResolvedValueOnce({
        id,
        name,
        weight,
        created_at
      })

      const result = await sut.perform({ name, weight })

      expect(result).toBeUndefined()
    })

    it('Should rethrow if LoadTodoByNameRepository throws', async () => {
      todoRepo.loadByName.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ name, weight })

      await expect(promise).rejects.toThrow()
    })
  })

  describe('AddTodoRepository', () => {
    it('Should call AddTodoRepository with correct values', async () => {
      await sut.perform({ name, weight })

      expect(todoRepo.add).toHaveBeenCalledWith({ name, weight })
      expect(todoRepo.add).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if AddTodoRepository throws', async () => {
      todoRepo.add.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ name, weight })

      await expect(promise).rejects.toThrow()
    })

    it('Should return undefined if LoadTodoByNameRepository returns an event', async () => {
      const result = await sut.perform({ name, weight })

      expect(result).toEqual({
        id,
        name,
        weight,
        created_at: expect.any(Date)
      })
    })
  })
})
