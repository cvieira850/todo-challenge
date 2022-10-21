import { PgTodoRepository } from '@/infra/pg/repos'

export const makePgTodoRepository = (): PgTodoRepository => {
  return new PgTodoRepository()
}
