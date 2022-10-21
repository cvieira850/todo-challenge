import { makePgTodoRepository } from '@/main/factories/infra/repos'
import { DeleteTodoService } from '@/data/services'

export const makeDeleteTodoService = (): DeleteTodoService => {
  return new DeleteTodoService(makePgTodoRepository())
}
