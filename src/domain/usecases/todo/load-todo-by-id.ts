import { Todo } from '@/domain/models'

export interface LoadTodoById {
  perform: (params: LoadTodoById.Params) => Promise<LoadTodoById.Result>
}

export namespace LoadTodoById {
  export type Params = {
    id: string
  }

  export type Result = Todo | undefined
}
