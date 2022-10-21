import { DeleteTodoController, Controller } from '@/application/controllers'
import { makeDeleteTodoService } from '@/main/factories/services'
import { makePgTransactionController } from '@/main/factories/decorators'

export const makeDeleteTodoController = (): Controller => {
  const controller = new DeleteTodoController(makeDeleteTodoService())
  return makePgTransactionController(controller)
}
