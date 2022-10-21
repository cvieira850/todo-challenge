import { Todo } from '@/domain/models'

export interface LoadTodoByNameRepository {
  loadByName: (params: LoadTodoByNameRepository.Params) => Promise<LoadTodoByNameRepository.Result>
}

export namespace LoadTodoByNameRepository {
  export type Params = {
    name: string
  }

  export type Result = Todo | undefined
}
