import { Todo } from '@/domain/models'

export interface LoadTodosRepository {
  load: (params: LoadTodosRepository.Params) => Promise<LoadTodosRepository.Result>
}

export namespace LoadTodosRepository {
  export type Params = null

  export type Result = Todo[] | undefined
}
