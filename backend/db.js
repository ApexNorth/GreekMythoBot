const path = require('path');
const Database = require('better-sqlite3');
//const db = new Database('./chatbot.db') //Enter database name.


const dbPath = path.join(__dirname, 'chatbot.db');
const db = new Database(dbPath, { fileMustExist: true });

//const dbPath = path.join(__dirname, 'chatbot.db');
console.log(dbPath);

const user = {
  userEmail: db.prepare(`
  SELECT EXISTS(
    SELECT 1 FROM user WHERE userEmail = ?
) AS matched;
`),
  userInfo: db.prepare(`
  SELECT EXISTS(
	  SELECT 1 FROM user WHERE userEmail = ? AND userPassword = ?
) AS matched;
`),
  addUser: db.prepare(`
INSERT INTO user (username, userPassword, userEmail, dateOfBirth) VALUES
(?, ?, ?, ?);
`),
  userRelationship: db.prepare(`
SELECT godName, favor
FROM userRelationship AS ur
JOIN god AS g
ON g.godID = ur.godID
WHERE ur.userID = ? AND ur.godID = ?;
`),
  userRelationships: db.prepare(`
SELECT godName, favor
FROM userRelationship AS ur
JOIN god as g
ON g.godID = ur.godID
WHERE ur.userID = ?;
`),
  userProfile: db.prepare(`
SELECT g.giftName 
FROM profile AS p
JOIN gifts AS g
ON g.giftID = p.giftID
WHERE p.userID = ?;
`),
  userHistory: db.prepare(`
SELECT sender, message, timestamp
FROM chatHistory AS ch
WHERE userID = ? AND godID = ?;
`),
  addMessage: db.prepare(`
INSERT INTO chatHistory (sender, message, timestamp, userID, godID)
VALUES (? , ? , ? , ? , ?);
`)
};

const god = {
  godNames: db.prepare(`
SELECT godName
FROM god;
`),
  godInfo: db.prepare(`
SELECT godID, godName, godDesc, godPersonality, godDomain, godTolerance, groupName 
FROM god
JOIN giftGroup AS gg
ON gg.groupID = god.giftGroupID;
`),
  getGod: db.prepare(`
SELECT godID, godName, godDesc, godPersonality, godDomain, godTolerance, groupName 
FROM god
JOIN giftGroup AS gg
ON gg.groupID = god.giftGroupID
WHERE god.godID = ?;
`)
}

const gift = {
  gifts: db.prepare(`
SELECT g.giftName, g.giftValue, gg.groupName 
FROM gifts AS g
JOIN giftGroup AS gg
ON gg.groupID = g.giftGroupID
`),
  gift: db.prepare(`
SELECT g.giftName, g.giftValue, gg.groupName 
FROM gifts AS g
JOIN giftGroup AS gg
ON gg.groupID = g.giftGroupID
WHERE giftID = ?;
`),
  giftGroups: db.prepare(`
SELECT groupName
FROM giftGroup;
`),
  giftGroup: db.prepare(`
SELECT groupName
FROM giftGroup
WHERE groupID = ?;
`)
}

module.exports = {user, god, gift};
