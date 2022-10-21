import { LoadTodosService } from '@/data/services'
import { LoadTodosRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadTodos Service', () => {
  let sut: LoadTodosService
  let todoRepo: MockProxy<LoadTodosRepository>
  let id: string
  let name: string
  let weight: number
  let created_at: Date
  let other_id: string
  let other_name: string
  let other_weight: number
  let other_created_at: Date

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    other_id = 'other_id'
    other_name = 'other_name'
    other_weight = 2
    other_created_at = new Date()
    todoRepo = mock()
    todoRepo.load.mockResolvedValue([
      {
        id,
        name,
        weight,
        created_at
      },
      {
        id: other_id,
        name: other_name,
        weight: other_weight,
        created_at: other_created_at
      }
    ])
  })

  beforeEach(() => {
    sut = new LoadTodosService(todoRepo)
  })

  it('Should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('Should be a class', () => {
    expect(typeof LoadTodosService).toBe('function')
  })

  it('Should instantiate', () => {
    expect(sut instanceof LoadTodosService).toBe(true)
  })

  it('Should have a perform method', () => {
    expect(sut.perform).toBeDefined()
  })

  it('Should implement the perform method', () => {
    expect(typeof sut.perform).toBe('function')
  })

  describe('LoadTodosRepository', () => {
    it('Should call LoadTodosRepository once', async () => {
      await sut.perform(null)

      expect(todoRepo.load).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if LoadTodosRepository throws', async () => {
      todoRepo.load.mockRejectedValueOnce(new Error())

      const promise = sut.perform(null)

      await expect(promise).rejects.toThrow()
    })

    it('Should return an array of todos on LoadTodosRepository success', async () => {
      const result = await sut.perform(null)

      expect(result).toEqual([
        {
          id,
          name,
          weight,
          created_at: expect.any(Date)
        },
        {
          id: other_id,
          name: other_name,
          weight: other_weight,
          created_at: expect.any(Date)
        }
      ])
    })
  })
})
