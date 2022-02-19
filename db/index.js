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
    const s = Math.sqrt(i * 13).toString();
    const randomUserName = names[parseInt(s[s.length - 1], 10) % names.length];
    data.users.push({
      id: i,
      name: `${randomUserName}_${i}`,
      gender: i % 2 === 0 || i % 7 === 0 ? "Male" : "Female",
    })
  }
  return data;
}