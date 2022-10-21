import {
  todoParamsSchema,
  todoSchema,
  todosSchema,
  errorSchema
} from './schemas/'

export default {
  todoParams: todoParamsSchema,
  todo: todoSchema,
  todos: todosSchema,
  error: errorSchema
}
