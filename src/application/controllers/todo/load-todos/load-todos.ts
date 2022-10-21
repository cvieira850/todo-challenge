import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse, ok, unauthorized } from '@/application/helpers'
import { LoadTodos } from '@/domain/usecases'

export class LoadTodosController extends Controller {
  constructor (private readonly loadTodos: LoadTodos) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const todos = await this.loadTodos.perform(null)
    if (todos) {
      return ok(todos)
    }
    return unauthorized()
  }
}
