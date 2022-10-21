
export interface DeleteTodo {
  perform: (params: DeleteTodo.Params) => Promise<DeleteTodo.Result>
}

export namespace DeleteTodo {
  export type Params = {
    id: string
  }

  export type Result = Error | undefined
}
