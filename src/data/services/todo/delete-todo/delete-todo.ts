import { DeleteTodo, DeleteTodoRepository, LoadTodoByIdRepository } from './delete-todo-protocols'
import { InvalidRequestError } from '@/data/errors'

export class DeleteTodoService implements DeleteTodo {
  constructor (private readonly todoRepo: LoadTodoByIdRepository & DeleteTodoRepository) {}
  async perform (params: DeleteTodo.Params): Promise<DeleteTodo.Result> {
    const todo = await this.todoRepo.loadById({ id: params.id })
    if (!todo) {
      throw new InvalidRequestError('Todo not found')
    }
    return await this.todoRepo.delete({ id: params.id })
  }
}
