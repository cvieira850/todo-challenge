import { UpdateTodoController, Controller } from '@/application/controllers'
import { makeUpdateTodoService } from '@/main/factories/services'
import { makePgTransactionController } from '@/main/factories/decorators'

export const makeUpdateTodoController = (): Controller => {
  const controller = new UpdateTodoController(makeUpdateTodoService())
  return makePgTransactionController(controller)
}
