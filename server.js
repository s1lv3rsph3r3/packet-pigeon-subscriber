const http = require('http');

const server = (function start() {
  const startServer = (app) => {
    const s = http.createServer(app);
    return s;
  };
  return {
    startServer,
  };
})();

module.exports = { server };
