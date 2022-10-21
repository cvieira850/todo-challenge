import { LoadTodoByIdService } from '@/data/services'
import { LoadTodoByIdRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadTodoByIdService', () => {
  let sut: LoadTodoByIdService
  let todoRepo: MockProxy<LoadTodoByIdRepository>
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
  })

  beforeEach(() => {
    sut = new LoadTodoByIdService(todoRepo)
  })

  it('Should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('Should be instance of LoadTodoByIdService', () => {
    expect(sut).toBeInstanceOf(LoadTodoByIdService)
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

    it('Should return undefined if LoadTodoByIdRepository returns undefined', async () => {
      todoRepo.loadById.mockResolvedValueOnce(undefined)

      const promise = sut.perform({ id })

      await expect(promise).resolves.toBeUndefined()
    })

    it('Should return Todo on LoadTodoByIdRepository success', async () => {
      const todo = await sut.perform({ id })

      expect(todo).toEqual({
        id,
        name,
        weight,
        created_at: expect.any(Date)
      })
    })
  })
})
