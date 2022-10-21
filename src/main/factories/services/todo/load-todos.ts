import { makePgTodoRepository } from '@/main/factories/infra/repos'
import { LoadTodosService } from '@/data/services'

export const makeLoadTodosService = (): LoadTodosService => {
  return new LoadTodosService(makePgTodoRepository())
}
