import { Controller, UpdateTodoController } from '@/application/controllers'
import { ServerError, UnauthorizedError } from '@/application/errors'
import { NumberValidator, RequiredValidator, StringValidator } from '@/application/validation'
import { InvalidRequestError } from '@/data/errors'
import { UpdateTodo } from '@/domain/usecases'
import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdateTodo Repository', () => {
  let sut: UpdateTodoController
  let usecase: MockProxy<UpdateTodo>
  let todoId: string
  let name: string
  let weight: number
  let created_at: Date

  beforeAll(() => {
    todoId = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    usecase = mock()
    usecase.perform.mockResolvedValue({ id: todoId, name, weight, created_at })
  })

  beforeEach(() => {
    sut = new UpdateTodoController(usecase)
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({
      params: { todoId },
      body: { name, weight }
    })

    expect(validators).toEqual([
      new RequiredValidator(todoId, 'todoId'),
      new StringValidator(todoId, 'todoId'),
      new RequiredValidator(name, 'name'),
      new StringValidator(name, 'name'),
      new RequiredValidator(weight, 'weight'),
      new NumberValidator(weight, 'weight')
    ])
  })

  describe('UpdateTodo Usecase', () => {
    it('Should call the UpdateTodo with correct params', async () => {
      await sut.handle({ params: { todoId }, body: { name, weight } })

      expect(usecase.perform).toHaveBeenCalledWith({ id: todoId, name, weight })
      expect(usecase.perform).toHaveBeenCalledTimes(1)
    })

    it('Should return 401 if UpdateTodo throw invalidRequestError', async () => {
      usecase.perform.mockRejectedValueOnce(new InvalidRequestError('Todo not found'))

      const httpResponse = await sut.handle({ params: { todoId }, body: { name, weight } })

      expect(httpResponse).toEqual({
        statusCode: 401,
        data: new UnauthorizedError()
      })
    })

    it('Should return 200 if UpdateTodo succeeds', async () => {
      const httpResponse = await sut.handle({ params: { todoId }, body: { name, weight } })

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

    it('Should return 201 if UpdateTodo fails', async () => {
      usecase.perform.mockResolvedValueOnce(undefined)

      const httpResponse = await sut.handle({ params: { todoId }, body: { name, weight } })

      expect(httpResponse).toEqual({
        statusCode: 201,
        data: null
      })
    })

    it('Should rethrow if UpdateTodo throw', async () => {
      const error = new Error('infra_error')
      usecase.perform.mockRejectedValueOnce(error)

      const httpResponse = await sut.handle({ params: { todoId }, body: { name, weight } })

      expect(httpResponse).toEqual({
        statusCode: 500,
        data: new ServerError(error)
      })
    })
  })
})
