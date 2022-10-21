export interface DeleteTodoRepository {
  delete: (params: DeleteTodoRepository.Params) => Promise<DeleteTodoRepository.Result>
}

export namespace DeleteTodoRepository {
  export type Params = {
    id: string
  }

  export type Result = undefined
}
