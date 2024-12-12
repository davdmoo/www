// WARNING: deprecated
// add created and updated at timestamp for guest messages

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
        rename column message to message_old;
      alter table guest_message
      add column message text not null check (length(message) <= 250) default '';
      update guest_message
        set message = message_old;
      alter table guest_message
        drop column message_old;

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
