//see https://github.com/typicode/json-server/issues/488

const JITTER_MAX = 2000;

module.exports = (req, res, next) => {
  const delay = Math.floor(Math.random() * Math.floor(JITTER_MAX));
  setTimeout(next, delay);
}
