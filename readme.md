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
