import { AddTodoController, Controller } from '@/application/controllers'
import { makeAddTodoService } from '@/main/factories/services'
import { makePgTransactionController } from '@/main/factories/decorators'

export const makeAddTodoController = (): Controller => {
  const controller = new AddTodoController(makeAddTodoService())
  return makePgTransactionController(controller)
}
