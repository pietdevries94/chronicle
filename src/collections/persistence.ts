import {
  createBrowserWASQLitePersistence,
  openBrowserWASQLiteOPFSDatabase,
} from "@tanstack/browser-db-sqlite-persistence";

const database = await openBrowserWASQLiteOPFSDatabase({
  databaseName: `tanstack-db.sqlite`,
});

export const persistence = createBrowserWASQLitePersistence({
  database,
});
