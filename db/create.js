var co = require('co');
var r = require('rethinkdbdash')();

const db = 'wingman';
const table = 'profiles';


co(function *() {
  try {
    yield r.dbList()
      .contains(db)
      .do(function(databaseExists) {
        return r.branch(databaseExists, r.dbDrop(db), { created: 1 });
      });

    yield r.dbCreate(db)
      .run()
      .then(function() {
        console.log(`Database '${db}' created.`);
      });

    yield r.db(db)
      .tableCreate(table)
      .run()
      .then(function() {
        console.log(`Table '${table}' created.`);
      });

    yield r.db(db)
      .table(table)
      .indexCreate('_id')
      .run()
      .then(function() {
        console.log(`Created Index _id  on Table '${table}'.`);
      });

  } catch (e) {
    console.log(e.message);
  }

  yield r.getPool().drain();
});
