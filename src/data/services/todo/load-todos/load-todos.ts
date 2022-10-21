import { LoadTodos, LoadTodosRepository } from './load-todos-protocols'

export class LoadTodosService implements LoadTodos {
  constructor (private readonly todoRepo: LoadTodosRepository) {}
  async perform (params: LoadTodos.Params): Promise<LoadTodos.Result> {
    return await this.todoRepo.load(null)
  }
}
