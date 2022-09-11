import { getCommitsForSubdirectories } from './getCommitsForSubdirectories'
// import clockifyImport from 'clockify-ts'
import 'dotenv/config'
import Clockify from './clockify'
import YAML from 'yaml'
import parseArgs from 'minimist'

const argv = parseArgs(process.argv.slice(2))
const clockify = new Clockify(process.env.API_KEY as string)

const commits = await getCommitsForSubdirectories(argv.w || argv.week)

const byDays: {
  folder: string
  day: string
  time: string
  message: string
}[] = []
const daysWithCommits = new Set()

Object.entries(commits).forEach(([folder, commits]) => {
  commits.forEach((commit) => {
    const day = commit.date.substring(0, 10)
    daysWithCommits.add(day)
    const time = commit.date.substring(11, 19)
    const message = commit.message
    const commitObject = {
      folder,
      day,
      time,
      message
    }
    byDays.push(commitObject)
  })
})

const days = Array.from(daysWithCommits).map((day) => {
  const commits = byDays.filter(
    (commit) =>
      commit.day === day &&
      !commit.message.startsWith('index') &&
      !commit.message.startsWith('untracked')
  )
  const commitMessagesPerFolder = {} as Record<string, string[]>
  commits.forEach((commit) => {
    if (!commitMessagesPerFolder[commit.folder]) {
      commitMessagesPerFolder[commit.folder] = []
    }
    commitMessagesPerFolder[commit.folder].push(commit.message)
  })
  return {
    day,
    description: YAML.stringify(commitMessagesPerFolder)
  }
})

// console.log(JSON.stringify(days, null, 2))

if (argv.out === 'json' || !argv.out) {
  console.log(JSON.stringify(days, null, 2))
} else if (argv.out === 'clockify') {
  for (const dayWithCommits of days) {
    await clockify.workspace
      .withId(process.env.WORKSPACE_ID as string)
      .timeEntries.post({
        projectId: process.env.PROJECT_ID as string,
        start: new Date(`${dayWithCommits.day}T07:00:00Z`),
        end: new Date(`${dayWithCommits.day}T15:00:00Z`),
        tagIds: [],
        taskId: '',
        description: dayWithCommits.description,
        billable: true
      })

    console.log(`posted ${dayWithCommits.day} to clockify`)
  }

  console.log(`added ${days.length} day entries to clockify`)
}
