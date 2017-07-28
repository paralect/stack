### package.json conventions

1. Use exact dependency version in every package, always push package-lock.json when you change packages.
2. Use `npm test` task to run all of your test. `npm-run-all` can help run all of your tests if you have many.
3. Use `npm start` task to run application in production mode and `npm run development` to run application in development mode.
