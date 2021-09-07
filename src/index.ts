import hcs, { LoginResultSuccess, SecondLoginResultSuccess } from 'hcs.js'
import dotenv from 'dotenv'
import Database from './classes/Database'
import { scheduleJob } from 'node-schedule'
import { UserData } from './types/users'
import { exec } from 'child_process'

dotenv.config()

const db = new Database()
const { HCSBUTGECKODRIVER_LOCATION_EXE, HCSBUTGECKODRIVER_LOCATION_DIR } = process.env

scheduleJob('0 10 6 * * 1-5', teacherCheck)
scheduleJob('0 10 7 * * 1-5', studentCheck)

async function teacherCheck () {
  const teachers = await db.getTeachers()
  for (const teacher of teachers) {
    setTimeout(check(teacher), Math.floor(Math.random() * 5 * 60 * 1000))
  }
}

async function studentCheck () {
  const students = await db.getStudents()
  for (const student of students) {
    setTimeout(check(student), Math.floor(Math.random() * 30 * 60 * 1000))
  }
}

function check (user: UserData) {
  return () =>
    exec(`${HCSBUTGECKODRIVER_LOCATION_EXE} ${user.name} ${user.birth} ${user.passwd}`, {
      cwd: HCSBUTGECKODRIVER_LOCATION_DIR
    })
}
