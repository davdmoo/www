// WARNING: deprecated
// add session table for logging tab-based session

// eslint-disable-next-line @typescript-eslint/no-require-imports
const libsql = require("@libsql/client")

const url = "file:local.db"
const db = libsql.createClient({ url })

async function migration() {
  console.log("starting migration..")

  try {
    await db.executeMultiple(`
      begin transaction;

      drop table if exists session;
      create table session (
        id text primary key not null,
        visitor_id text not null,
        session_start timestamp not null default current_timestamp,
        session_end timestamp not null default current_timestamp
      );

      commit;
    `)

    console.log("migration successful - closing DB connection..")
    db.close()
    console.log("DB connection closed")
  } catch (err) {
    console.error(err, "<<< Error")

    if (err instanceof libsql.LibsqlError) {
      console.error(err.stack, "<<< Libsql Error")
    }
  }
}

migration()
