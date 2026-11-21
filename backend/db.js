const path = require('path');
const Database = require('better-sqlite3');
//const db = new Database('./chatbot.db') //Enter database name.


const dbPath = path.join(__dirname, 'chatbot.db');
const db = new Database(dbPath, { fileMustExist: true });

//const dbPath = path.join(__dirname, 'chatbot.db');
console.log(dbPath);

const user = {
  userInfo: db.prepare(`
  SELECT EXISTS(
	  SELECT 1 FROM user WHERE userEmail = ? AND userPassword = ?
) AS matched;
`),
  addUser: db.prepare(`
  INSERT INTO giftGroup (groupName) VALUES
  (?)
`),
 getUserInfo(email, password) {return this.userInfo.all(email, password);}
};

module.exports = {user};
