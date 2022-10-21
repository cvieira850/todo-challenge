import { PgConnection } from '@/infra/pg/helpers'
import { ObjectType, Repository } from 'typeorm'

export abstract class PgRepository {
  constructor (private readonly connection: PgConnection = PgConnection.getInstance()) {}

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<any> {
    return this.connection.getRepository(entity)
  }
}
