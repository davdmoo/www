// WARNING: deprecated
// split user agent into browser, device, and OS and update the analytic's table

// eslint-disable-next-line @typescript-eslint/no-require-imports
const libsql = require("@libsql/client")

const url = "file:local.db"
const db = libsql.createClient({ url: url })

async function migration() {
  console.log("starting migration..")

  try {
    await db.executeMultiple(`
      begin transaction;

      drop table if exists browser;
      drop table if exists operating_system;
      drop table if exists device;

      create table browser (
        id integer primary key not null,
        name text not null check(length(name) <= 50),
        version text not null check(length(version) <= 50),
        unique(name, version)
      );

      create table operating_system (
        id integer primary key not null,
        name text not null check(length(name) <= 50),
        version text not null check(length(version) <= 50),
        unique(name, version)
      );

      create table device (
        id integer primary key not null,
        type text not null check(length(type) <= 50),
        vendor text not null check(length(vendor) <= 50),
        model text not null check(length(model) <= 50),
        unique(type, vendor, model)
      );

      insert into browser (id, name, version) values (1, 'Firefox', '133.0');
      insert into operating_system (id, name, version) values (1, 'Windows', '10');
      insert into device (id, type, vendor, model) values (1, '', '', '');

      create table analytic_new (
        id integer primary key not null,
        path_id integer not null,
        browser_id integer not null,
        os_id integer not null,
        device_id integer not null,
        visitor_id text not null,
        referrer text not null,
        user_agent text not null,
        timestamp timestamp default current_timestamp,
        foreign key (path_id)
          references path (id)
          on delete cascade
        foreign key (browser_id)
          references browser (id)
          on delete cascade
        foreign key (os_id)
          references operating_system (id)
          on delete cascade
        foreign key (device_id)
          references device (id)
          on delete cascade
      );

      insert into analytic_new (id, path_id, browser_id, os_id, device_id, visitor_id, referrer, user_agent, timestamp)
        select id, path_id, 1 as browser_id, 1 as os_id, 1 as device_id, visitor_id, referrer, user_agent, timestamp from analytic;
      alter table analytic
        rename to analytic_old;
      drop table analytic_old;
      alter table analytic_new
        rename to analytic;

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
