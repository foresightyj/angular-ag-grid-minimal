//@ts-check
const names = require("./names");

/**
 * @typedef {import("../types").IUser} IUser
 */

const NO_OF_USERS = 127;

module.exports = () => {
  /** @type {IUser[]} */
  const users = [];
  const data = { users };
  for (let i = 0; i <= NO_OF_USERS; i++) {
    const randDigits = Math.sqrt(i * 13).toString().replace(".", "").substring(0, 6);
    const randInt = parseInt(randDigits, 10);
    const randomUserName = names[randInt % names.length];
    const d = new Date(2022, randInt % 12, (randInt % 28) + 1);
    data.users.push({
      id: i,
      name: `${randomUserName}_${i}`,
      gender: i % 2 === 0 || i % 7 === 0 ? "Male" : "Female",
      lastLoggedIn: d
    })
  }
  return data;
}