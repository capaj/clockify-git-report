# clockify-git-report

simple CLI to report daily work to clockify from multiple git repositories.

## How to use

it assumes you have git directories inside single folder. Run the command there.

install, add .env like this:

```
API_KEY=yourApiKey
CLOCKIFY_PROJECT=yourProjectName
PROJECT_ID=bestToFindThisInTheBrowserFromURL
WORKSPACE_ID=sameHereFindThisInTheBrowserFromURL
```

and finally run:

```bash
clockify-git-report -w 0 --out clockify  # for current week
clockify-git-report -w 1 --out clockify # for previous week
clockify-git-report -w 2 --out clockify # for week before previous
...
```

to write the output to the terminal as

- json instead of pushing it to clockify do

```
clockify-git-report -w 1 --out json
```

- yaml

```
clockify-git-report -w 1 --out yaml
```

this is the sample yaml output:
```yaml
- day: 2022-11-20
  description: |
    official-graphql:
      - add a flag
- day: 2022-11-18
  description: |
    official-graphql:
      - fix a bug in getNotesByUser
- day: 2022-11-17
  description: |
    official-graphql:
      - make fields on Post nullable
      - add a few more checks to prevent needless type errors
      - bump deps
    official-rn:
      - remove stuff (#67)
- day: 2022-11-16
  description: |
    official-graphql:
      - schema chore
      - better condition for registerRateLimiter config
      - add favoritesIntimacyDefaultOrdering (#180)
      - fix yarn lock
      - fix migrations
      - remove bad defaults for picture from the schema and from the API (#181)
      - Viator (#166)
      - add basic specs for SuperDuperModel
      - adds a TODO
      - map missing fields for date cards
- day: 2022-11-15
  description: |
    official-graphql:
      - fix unit test mock for "@prisma/client"
      - fixes admin dash bug and add TODO
      - fix tsc
      - remove redis migration utilities
      - add favoritesIntimacyDefaultOrdering
- day: 2022-11-14
  description: |
    official-graphql:
      - fix TSC
      - remove forgotten files after renames
      - better naming for the keys of countRedisKeys resolver payload
      - remove repeatable events from getNotesByUser (#172)
      - Fix last relationship resolver (#174)
    official-rn:
      - remove needless lastCheckin query
      - fix obsolete query



```

