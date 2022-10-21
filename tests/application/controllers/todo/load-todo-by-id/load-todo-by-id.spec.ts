import { Controller, LoadTodoByIdController } from '@/application/controllers'
import { RequiredValidator, StringValidator } from '@/application/validation'
import { LoadTodoById } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadTodoByIdController', () => {
  let sut: LoadTodoByIdController
  let loadTodoById: MockProxy<LoadTodoById>
  let todoId: string
  let name: string
  let weight: number
  let created_at: Date

  beforeAll(() => {
    todoId = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    loadTodoById = mock()
    loadTodoById.perform.mockResolvedValue({
      id: todoId,
      name,
      weight,
      created_at
    })
  })
  beforeEach(() => {
    sut = new LoadTodoByIdController(loadTodoById)
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ params: { todoId } })

    expect(validators).toEqual([
      new RequiredValidator(todoId, 'todoId'),
      new StringValidator(todoId, 'todoId')
    ])
  })

  describe('LoaTodoById', () => {
    it('Should call LoaTodoById with correct id', async () => {
      await sut.handle({ params: { todoId } })

      expect(loadTodoById.perform).toHaveBeenCalledWith({ id: todoId })
      expect(loadTodoById.perform).toHaveBeenCalledTimes(1)
    })
  })

  it('Should return 201 if LoaTodoById fails', async () => {
    loadTodoById.perform.mockResolvedValueOnce(undefined)

    const httpResponse = await sut.handle({ params: { todoId } })

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: null
    })
  })

  it('Should return 200 if LoaTodoById succeeds', async () => {
    const httpResponse = await sut.handle({ params: { todoId } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id: todoId,
        name,
        weight,
        created_at: expect.any(Date)
      }
    })
  })
})
