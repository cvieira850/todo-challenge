import { Todo } from '@/domain/models'

export interface UpdateTodoRepository {
  update: (params: UpdateTodoRepository.Params) => Promise<UpdateTodoRepository.Result>
}

export namespace UpdateTodoRepository {
  export type Params = {
    id: string
    name?: string
    weight?: number
  }

  export type Result = Todo | undefined
}
