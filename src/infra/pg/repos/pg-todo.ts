import { AddTodoRepository, DeleteTodoRepository, LoadTodoByIdRepository, LoadTodoByNameRepository, LoadTodosRepository, UpdateTodoRepository } from '@/data/protocols/db'
import { PgRepository } from '@/infra/pg/repos/repository'
import { Todo } from '@/infra/pg/entities'

export class PgTodoRepository extends PgRepository implements
LoadTodoByNameRepository,
AddTodoRepository,
LoadTodosRepository,
LoadTodoByIdRepository,
UpdateTodoRepository,
DeleteTodoRepository {
  async loadByName (params: LoadTodoByNameRepository.Params): Promise<LoadTodoByNameRepository.Result> {
    const todoRepo = this.getRepository(Todo)
    const todo = await todoRepo.findOne({ where: { name: params.name } })
    if (todo) {
      return {
        id: todo.id.toString(),
        name: todo.name,
        weight: todo.weight,
        created_at: todo.created_at
      }
    }
  }

  async add (params: AddTodoRepository.Params): Promise<AddTodoRepository.Result> {
    const todo = await this.getRepository(Todo).save({
      name: params.name,
      weight: params.weight
    })
    if (todo) {
      return {
        id: todo.id.toString(),
        name: todo.name,
        weight: todo.weight,
        created_at: todo.created_at
      }
    }
  }

  async load (params: LoadTodosRepository.Params): Promise<LoadTodosRepository.Result> {
    const todoRepo = this.getRepository(Todo)
    const todos = await todoRepo.find({ select: ['id', 'name', 'weight', 'created_at'] })
    if (todos.length > 0) {
      return todos
    }
  }

  async loadById (params: LoadTodoByIdRepository.Params): Promise<LoadTodoByIdRepository.Result> {
    const todoRepo = this.getRepository(Todo)
    const todo = await todoRepo.findOne({ where: { id: params.id } })
    if (todo) {
      return {
        id: todo.id.toString(),
        name: todo.name,
        weight: todo.weight,
        created_at: todo.created_at
      }
    }
  }

  async update (params: UpdateTodoRepository.Params): Promise<UpdateTodoRepository.Result> {
    const todoRepo = this.getRepository(Todo)
    const todo = await todoRepo.findOne({ where: { id: params.id } })
    if (todo) {
      const updatedTodo = await todoRepo.save({
        id: todo.id,
        name: params.name ? params.name : todo.name,
        weight: params.weight ? params.weight : todo.weight
      })
      if (updatedTodo) {
        return {
          id: updatedTodo.id.toString(),
          name: updatedTodo.name,
          weight: updatedTodo.weight,
          created_at: todo.created_at
        }
      }
    }
  }

  async delete (params: DeleteTodoRepository.Params): Promise<DeleteTodoRepository.Result> {
    const todoRepo = this.getRepository(Todo)
    const todo = await todoRepo.findOne({ where: { id: params.id } })
    if (todo) {
      await todoRepo.softDelete(params.id)
      return undefined
    }
  }
}
