# Local Development

## Notes
- This project uses [pnpm](https://pnpm.io) to manage its dependencies
- I recommend to have [SQLite3](https://www.sqlite.org/) in your local environment to ease development

```bash
  pnpm install

  touch local.db
  node ./bootstrap_db.js

  pnpm run dev
```
