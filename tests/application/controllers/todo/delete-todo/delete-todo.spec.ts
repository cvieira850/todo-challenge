import { Controller, DeleteTodoController } from '@/application/controllers'
import { ServerError, UnauthorizedError } from '@/application/errors'
import { RequiredValidator, StringValidator } from '@/application/validation'
import { InvalidRequestError } from '@/data/errors'
import { DeleteTodo } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DeleteTodo Controller', () => {
  let sut: DeleteTodoController
  let usecase: MockProxy<DeleteTodo>
  let todoId: string

  beforeAll(() => {
    todoId = 'any_id'
    usecase = mock()
    usecase.perform.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new DeleteTodoController(usecase)
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({
      params: { todoId }
    })

    expect(validators).toEqual([
      new RequiredValidator(todoId, 'todoId'),
      new StringValidator(todoId, 'todoId')
    ])
  })

  describe('DeleteTodo Usecase', () => {
    it('Should call the DeleteTodo with correct params', async () => {
      await sut.handle({ params: { todoId } })

      expect(usecase.perform).toHaveBeenCalledWith({ id: todoId })
      expect(usecase.perform).toHaveBeenCalledTimes(1)
    })

    it('Should return 401 if DeleteTodo throw invalidRequestError', async () => {
      usecase.perform.mockRejectedValueOnce(new InvalidRequestError('Todo not found'))

      const httpResponse = await sut.handle({ params: { todoId } })

      expect(httpResponse).toEqual({
        statusCode: 401,
        data: new UnauthorizedError()
      })
    })

    it('Should return 201 if DeleteTodo succeeds', async () => {
      const httpResponse = await sut.handle({ params: { todoId } })

      expect(httpResponse).toEqual({
        statusCode: 201,
        data: null
      })
    })

    it('Should rethrow if DeleteTodo throw', async () => {
      const error = new Error('infra_error')
      usecase.perform.mockRejectedValueOnce(error)

      const httpResponse = await sut.handle({ params: { todoId } })

      expect(httpResponse).toEqual({
        statusCode: 500,
        data: new ServerError(error)
      })
    })
  })
})
