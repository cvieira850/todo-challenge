import { LoadTodoById, LoadTodoByIdRepository } from './load-todo-by-id-protocols'

export class LoadTodoByIdService implements LoadTodoById {
  constructor (private readonly loadTodoByIdRepository: LoadTodoByIdRepository) {}
  async perform (params: LoadTodoById.Params): Promise<LoadTodoById.Result> {
    return await this.loadTodoByIdRepository.loadById({ id: params.id })
  }
}
