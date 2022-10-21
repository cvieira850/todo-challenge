import { HttpRequest, HttpResponse, noContent, unauthorized } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { DeleteTodo } from '@/domain/usecases'
import { InvalidRequestError } from '@/data/errors'

export class DeleteTodoController extends Controller {
  constructor (private readonly usecase: DeleteTodo) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      await this.usecase.perform({ id: httpRequest.params.todoId })
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
      ...Builder.of({ value: httpRequest.params.todoId, fieldName: 'todoId' }).required().string().build()
    ]
  }
}
