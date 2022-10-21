import { makePgTodoRepository } from '@/main/factories/infra/repos'
import { LoadTodoByIdService } from '@/data/services'

export const makeLoadTodoByIdService = (): LoadTodoByIdService => {
  return new LoadTodoByIdService(makePgTodoRepository())
}
