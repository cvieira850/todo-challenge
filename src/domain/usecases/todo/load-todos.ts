import { Todo } from '@/domain/models'

export interface LoadTodos {
  perform: (params: LoadTodos.Params) => Promise<LoadTodos.Result>
}

export namespace LoadTodos {
  export type Params = null

  export type Result = Todo[] | undefined
}
