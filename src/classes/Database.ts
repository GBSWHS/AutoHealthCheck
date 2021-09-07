import dotenv from 'dotenv'
import knex, { Knex } from 'knex'
import { UserData } from '../types/users'

dotenv.config()

export default class Database {
  private db: Knex

  constructor () {
    this.db = knex({
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER || 'gbswcovid',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'gbswcovid',
      }
    })
  }

  public getTeachers = (): Promise<UserData[]> =>
    this.db.select('*').from('users').where({ type: 'T' })

  public getStudents = (): Promise<UserData[]> =>
    this.db.select('*').from('users').where({ type: 'S' })
}