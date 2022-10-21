import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeDeleteTodoController, makeAddTodoController, makeLoadTodosController, makeLoadTodoByIdController, makeUpdateTodoController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  const controller = makeAddTodoController()
  const loadTodosController = makeLoadTodosController()
  const loadTodoByIdController = makeLoadTodoByIdController()
  const updateTodoController = makeUpdateTodoController()
  const deleteTodoController = makeDeleteTodoController()

  router.post('/todos', adapt(controller))
  router.get('/todos', adapt(loadTodosController))
  router.get('/todos/:todoId', adapt(loadTodoByIdController))
  router.put('/todos/:todoId', adapt(updateTodoController))
  router.delete('/todos/:todoId', adapt(deleteTodoController))
}
