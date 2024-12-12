// WARNING: deprecated
// remove visitor_id from session, guest_message, and analytic

// eslint-disable-next-line @typescript-eslint/no-require-imports
const libsql = require("@libsql/client")

const url = "file:local.db"
const db = libsql.createClient({ url })

async function migration() {
  console.log("starting migration..")

  try {
    await db.executeMultiple(`
      begin transaction;

      alter table guest_message
        drop column visitor_id;

      alter table analytic
        drop column visitor_id;

      alter table session
        drop column visitor_id;

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
