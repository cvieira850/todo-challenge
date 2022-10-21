import { Todo } from '@/domain/models'

export interface LoadTodoByIdRepository {
  loadById: (params: LoadTodoByIdRepository.Params) => Promise<LoadTodoByIdRepository.Result>
}

export namespace LoadTodoByIdRepository {
  export type Params = {
    id: string
  }

  export type Result = Todo | undefined
}
