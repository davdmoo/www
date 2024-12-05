// eslint-disable-next-line @typescript-eslint/no-require-imports
const libsql = require("@libsql/client")

// setup local DB
const db = libsql.createClient({
  url: "file:local.db",
})

async function bootstrap() {
  console.log("bootstrapping local DB..")

  try {
    await db.executeMultiple(`
      begin transaction;

      drop table if exists analytic;
      drop table if exists path;
      drop table if exists browser;
      drop table if exists operating_system;
      drop table if exists device;

      create table path (
        id integer primary key not null,
        name text not null,
        visit_count integer not null default 0,
        unique_visit_count integer not null default 0,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp
      );

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

      create table analytic (
        id integer primary key not null,
        path_id integer not null,
        browser_id integer,
        os_id integer,
        device_id integer,
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

      insert into path (name) values ('/');
      insert into path (name) values ('/experience');
      insert into path (name) values ('/projects');
      insert into path (name) values ('/guest-book');

      commit;
    `)

    console.log("bootstrapping successful")
  } catch (err) {
    console.error(err, "< Error")

    if (err instanceof libsql.LibsqlError) {
      console.error(err.stack, "<<< Libsql Error")
    }
  }
}

bootstrap()
