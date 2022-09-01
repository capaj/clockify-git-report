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
clockify-git-report 0  # for current week
clockify-git-report 1  # for previous week
clockify-git-report 2  # for week before previous
...
```
