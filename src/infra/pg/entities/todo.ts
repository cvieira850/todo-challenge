/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  name!: string

  @Column()
  weight!: number

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn({ nullable: true })
  updated_at!: Date

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date
}
