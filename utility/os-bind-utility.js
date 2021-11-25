const environment = require('../environment');

const bindToPort = (httpServer) => {
  // Let the server listen on a particular port
  httpServer.listen(environment.values().appPort, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Server listening on ${environment.values().appUrl} : ${
        environment.values().appPort
      }`,
    );
  });
};

module.exports = {
  bindToPort,
};
