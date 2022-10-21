import { Controller, LoadTodoByIdController } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/decorators'
import { makeLoadTodoByIdService } from '@/main/factories/services'

export const makeLoadTodoByIdController = (): Controller => {
  const controller = new LoadTodoByIdController(makeLoadTodoByIdService())
  return makePgTransactionController(controller)
}
