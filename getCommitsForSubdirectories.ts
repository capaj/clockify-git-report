import { execa } from 'execa'
import fs, { stat } from 'fs/promises'
import { statSync } from 'fs'

const getDirectories = async () => {
  const paths = await fs.readdir('./')
  return paths.filter((path) => statSync(path).isDirectory())
}

const seenRepos = new Set()
/**
 *
 * @param weeksAgo 0 is this week, 1 is last week, etc.
 */
export const getCommitsForSubdirectories = async (weeksAgo: number) => {
  const hashmapWithCommits = {} as Record<
    string,
    {
      date: string
      message: string
    }[]
  >
  const directories = await getDirectories()
  console.log(
    `getting all commits since ${
      weeksAgo + 1
    } sunday ago until ${weeksAgo} sunday ago`
  )
  for (const key of directories) {
    const gitLog = [
      'log',
      '--author=capajj@gmail.com',
      `--since='${weeksAgo + 1} sunday ago'`,
      `--until='${weeksAgo} sunday ago'`,
      `--format='%Cgreen%ci%Creset %s%Creset'`,
      `--date=iso`,
      `--no-merges`,
      '--all'
    ]
    try {
      const gitRemote = await execa('git', ['remote', 'get-url', 'origin'], {
        cwd: key
      })
      if (seenRepos.has(gitRemote.stdout)) {
        console.warn('skipping', key)

        continue
      }
      seenRepos.add(gitRemote.stdout)
    } catch (err) {
      console.warn('skipping', key)
      continue
    }
    console.log(`reading commits for ${key}`)

    const { stdout, stderr } = await execa('git', gitLog, {
      cwd: key
    })
    if (stdout.length) {
      const splitted = stdout.split(`\n`)
      const seenMessages = new Set()

      const parsed = splitted
        .map((line) => {
          const date = line.substring(1, 26)
          const messagePart = line.substring(27)
          const message = messagePart.substring(0, messagePart.length - 1)
          return {
            date,
            message
          }
        })
        .filter(({ message }) => {
          if (seenMessages.has(message)) {
            return false
          }
          seenMessages.add(message)
          return true
        })

      hashmapWithCommits[key] = parsed
    }
  }
  return hashmapWithCommits
}
