import { HttpRequest, HttpResponse, unauthorized, ok, noContent } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { Controller } from '@/application/controllers'
import { UpdateTodo } from '@/domain/usecases'
import { InvalidRequestError } from '@/data/errors'

export class UpdateTodoController extends Controller {
  constructor (private readonly usecase: UpdateTodo) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const todo = await this.usecase.perform(
        {
          id: httpRequest.params.todoId,
          name: httpRequest.body.name,
          weight: httpRequest.body.weight
        })
      if (todo) {
        return ok(todo)
      }
      return noContent()
    } catch (error) {
      if (error instanceof InvalidRequestError) {
        return unauthorized()
      }
      throw error
    }
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.todoId, fieldName: 'todoId' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.name, fieldName: 'name' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.weight, fieldName: 'weight' }).required().number().build()
    ]
  }
}
