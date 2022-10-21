import { makePgTodoRepository } from '@/main/factories/infra/repos'
import { UpdateTodoService } from '@/data/services'

export const makeUpdateTodoService = (): UpdateTodoService => {
  return new UpdateTodoService(makePgTodoRepository())
}
