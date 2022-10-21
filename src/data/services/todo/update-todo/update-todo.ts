import { InvalidRequestError } from '@/data/errors'
import { UpdateTodo, LoadTodoByIdRepository, UpdateTodoRepository } from './update-todo-protocols'

export class UpdateTodoService implements UpdateTodo {
  constructor (
    private readonly todoRepo: LoadTodoByIdRepository & UpdateTodoRepository
  ) {}

  async perform (params: UpdateTodo.Params): Promise<UpdateTodo.Result> {
    const todo = await this.todoRepo.loadById({ id: params.id })
    if (!todo) {
      throw new InvalidRequestError('Todo not found')
    }
    const updatedTodo = await this.todoRepo.update({ id: params.id, name: params.name, weight: params.weight })
    if (updatedTodo) {
      return updatedTodo
    }
  }
}
