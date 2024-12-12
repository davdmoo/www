// WARNING: deprecated
// add created and updated at timestamp for guest messages

// eslint-disable-next-line @typescript-eslint/no-require-imports
const libsql = require("@libsql/client")

const url = "file:local.db"
const db = libsql.createClient({ url: url })

async function migration() {
  console.log("starting migration..")

  try {
    await db.executeMultiple(`
      begin transaction;

      create table guest_message_new (
        id integer primary key not null,
        message text check(length(message) <= 50) not null,
        visitor_id text check(length(visitor_id) <= 50) not null, visitor_name text check (length(visitor_name) <= 50) not null,
        created_at timestamp not null default current_timestamp,
        updated_at timestamp not null default current_timestamp
      );
      insert into guest_message_new (id, message, visitor_id, visitor_name)
        select id, message, visitor_id, visitor_name from guest_message;
      alter table guest_message
        rename to guest_message_old;
      drop table guest_message_old;
      alter table guest_message_new
        rename to guest_message;

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
