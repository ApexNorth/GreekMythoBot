const Database = require('better-sqlite3');
const db = new Database('') //Enter database name.

const user = {
  getUserInfo: db.prepare(`
  SELECT * FROM user;
`)
}

module.exports = {user};
