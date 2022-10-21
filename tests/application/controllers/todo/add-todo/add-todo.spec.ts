import { AddTodoController, Controller } from '@/application/controllers'
import { AddTodo } from '@/domain/usecases'
import { NumberValidator, RequiredValidator, StringValidator } from '@/application/validation'
import { UnauthorizedError } from '@/application/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddTodoController', () => {
  let sut: AddTodoController
  let addTodo: MockProxy<AddTodo>
  let id: string
  let name: string
  let weight: number
  let created_at: Date

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    addTodo = mock()
    addTodo.perform.mockResolvedValue({
      id,
      name,
      weight,
      created_at
    })
  })

  beforeEach(async () => {
    sut = new AddTodoController(addTodo)
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({
      body: { name, weight }
    })

    expect(validators).toEqual([
      new RequiredValidator(name, 'name'),
      new StringValidator(name, 'name'),
      new RequiredValidator(weight, 'weight'),
      new NumberValidator(weight, 'weight')
    ])
  })

  describe('Add Todo usecase', () => {
    it('Should call AddTodo with correct values', async () => {
      await sut.handle({ body: { name, weight } })

      expect(addTodo.perform).toHaveBeenCalledWith({ name, weight })
      expect(addTodo.perform).toHaveBeenCalledTimes(1)
    })

    it('Should return 200 if AddTodo succeeds', async () => {
      const httpResponse = await sut.handle({ body: { name, weight } })

      expect(httpResponse).toEqual({
        statusCode: 200,
        data: {
          id,
          name,
          weight,
          created_at: expect.any(Date)
        }
      })
    })

    it('Should return 401 if AddTodo fails', async () => {
      addTodo.perform.mockResolvedValueOnce(undefined)

      const httpResponse = await sut.handle({ body: { name, weight } })

      expect(httpResponse).toEqual({
        statusCode: 401,
        data: new UnauthorizedError()
      })
    })
  })
})
