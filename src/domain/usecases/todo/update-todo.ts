import { Todo } from '@/domain/models'

export interface UpdateTodo {
  perform: (params: UpdateTodo.Params) => Promise<UpdateTodo.Result>
}

export namespace UpdateTodo {
  export type Params = {
    id: string
    name?: string
    weight?: number
  }

  export type Result = Todo | Error | undefined
}
