import { Todo } from '@/domain/models'

export interface AddTodoRepository {
  add: (params: AddTodoRepository.Params) => Promise<AddTodoRepository.Result>
}

export namespace AddTodoRepository {
  export type Params = {
    name: string
    weight: number
  }

  export type Result = Todo | undefined
}
