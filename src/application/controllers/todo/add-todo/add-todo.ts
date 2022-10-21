import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse, ok, unauthorized } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { AddTodo } from '@/domain/usecases'

export class AddTodoController extends Controller {
  constructor (private readonly addTodo: AddTodo) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const todo = await this.addTodo.perform({ name: httpRequest.body.name, weight: httpRequest.body.weight })
    if (todo) {
      return ok(todo)
    }

    return unauthorized()
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.body.name, fieldName: 'name' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.weight, fieldName: 'weight' }).required().number().build()
    ]
  }
}
