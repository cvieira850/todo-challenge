import { DeleteTodoService } from '@/data/services'
import { LoadTodoByIdRepository, DeleteTodoRepository } from '@/data/protocols/db'
import { InvalidRequestError } from '@/data/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DeleteTodoService', () => {
  let sut: DeleteTodoService
  let todoRepo: MockProxy<LoadTodoByIdRepository & DeleteTodoRepository>
  let id: string
  let name: string
  let weight: number
  let created_at: Date

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    todoRepo = mock()
    todoRepo.loadById.mockResolvedValue({
      id,
      name,
      weight,
      created_at
    })
    todoRepo.delete.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new DeleteTodoService(todoRepo)
  })

  describe('LoadTodoByIdRepository', () => {
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

  describe('DeleteTodoRepository', () => {
    it('Should call DeleteTodoRepository with correct id', async () => {
      await sut.perform({ id })

      expect(todoRepo.delete).toHaveBeenCalledWith({ id })
      expect(todoRepo.delete).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if DeleteTodoRepository throws', async () => {
      todoRepo.delete.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ id })

      await expect(promise).rejects.toThrow(new Error())
    })

    it('Should return undefined on DeleteTodoRepository success', async () => {
      const result = await sut.perform({ id })

      expect(result).toBeUndefined()
    })
  })
})
