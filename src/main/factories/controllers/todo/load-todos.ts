import { LoadTodosController, Controller } from '@/application/controllers'
import { makeLoadTodosService } from '@/main/factories/services'
import { makePgTransactionController } from '@/main/factories/decorators'

export const makeLoadTodosController = (): Controller => {
  const controller = new LoadTodosController(makeLoadTodosService())
  return makePgTransactionController(controller)
}
