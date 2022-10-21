import { AddTodo, LoadTodoByNameRepository, AddTodoRepository } from './add-todo-protocols'

export class AddTodoService implements AddTodo {
  constructor (
    private readonly todoRepo: LoadTodoByNameRepository & AddTodoRepository
  ) {}

  async perform (params: AddTodo.Params): Promise<AddTodo.Result> {
    const todo = await this.todoRepo.loadByName({ name: params.name })
    if (!todo) {
      return await this.todoRepo.add({ name: params.name, weight: params.weight })
    }
  }
}
