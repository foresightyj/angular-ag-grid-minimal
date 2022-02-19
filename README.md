# how to run?

1. run `npm run mock` to run mock servers give users at `localhost:3000/users`;
2. run `npm start` to develop the angular app with ag-grid demo.

# mock data via json-server with random jitter

using [json-server](https://www.npmjs.com/package/json-server) with *Generate random data* capability. See `db.js` file.

see https://github.com/typicode/json-server/issues/488 for how to introduce some random delay & jitter to the api to simulate more real networking scenarios.

Then run:

```bash
json-server --watch db/index.js --delay 10 --middlewares db/jitter.js
```

or run `npm run mock`

This will give mocked ajax requests at least a delay of 10ms plus variable amount of delay between 0 ~ 2000ms.
