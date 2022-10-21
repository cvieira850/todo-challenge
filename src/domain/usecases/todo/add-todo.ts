import { Todo } from '@/domain/models'

export interface AddTodo {
  perform: (params: AddTodo.Params) => Promise<AddTodo.Result>
}

export namespace AddTodo {
  export type Params = {
    name: string
    weight: number
  }

  export type Result = Todo | undefined
}
