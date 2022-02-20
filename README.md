# purpose

This project is to demonstrate the usage of libaries in angular, particularly ag-grid, rx.js.

# how to run?

1. run `npm run mock` to run mock servers give users at `localhost:3000/users`;
2. run `npm start` to develop the angular app with ag-grid demo.

# docs

https://github.com/typicode/json-server

https://www.ag-grid.com/angular-data-grid/infinite-scrolling

# mock data via json-server with random jitter

using [json-server](https://www.npmjs.com/package/json-server) with *Generate random data* capability. See `db.js` file.

see https://github.com/typicode/json-server/issues/488 for how to introduce some random delay & jitter to the api to simulate more real networking scenarios.

Then run:

```bash
json-server --watch db/index.js --delay 10 --middlewares db/jitter.js
```

or run `npm run mock`

This will give mocked ajax requests at least a delay of 10ms plus variable amount of delay between 0 ~ 2000ms.

# pagination

## case 1

If you have 127 records, and page size is 20, then last page contains only 7 records.

What [lastRow](https://www.ag-grid.com/angular-data-grid/infinite-scrolling/#setting-last-row-index) means is that:
1. if we are not at last page, then set `lastRow` to `null` or `undefined`;
2. if we are at last page, we only have 7 records, set `lastRow` to 7.

## case 2

If you have exactly 140 records, and page size is 20, then last page actually contains 20.
