import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse, noContent, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { LoadTodoById } from '@/domain/usecases'

export class LoadTodoByIdController extends Controller {
  constructor (private readonly loadTodoById: LoadTodoById) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const todo = await this.loadTodoById.perform({ id: httpRequest.params.todoId })
    if (!todo) {
      return noContent()
    }
    return ok(todo)
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.todoId, fieldName: 'todoId' }).required().string().build()
    ]
  }
}
