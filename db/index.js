//@ts-check

/**
 * @typedef {import("../types").IUser} IUser
 */


module.exports = () => {
  /** @type {IUser[]} */
  const users = [];
  const randomUserNames = ["jake", "john", "jane", "rose"];
  const data = { users };
  for (let i = 1; i <= 127; i++) {
    const s = Math.sqrt(i).toString();
    const randomUserName = randomUserNames[parseInt(s[s.length - 1], 10) % randomUserNames.length];
    data.users.push({
      id: i,
      name: `${randomUserName}_${i}`,
      gender: i % 2 === 0 || i % 7 === 0 ? "Male" : "Female",
    })
  }
  return data;
}