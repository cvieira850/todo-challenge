import { makePgTodoRepository } from '@/main/factories/infra/repos'
import { AddTodoService } from '@/data/services'

export const makeAddTodoService = (): AddTodoService => {
  return new AddTodoService(makePgTodoRepository())
}
