#!/usr/bin/env node
const environment = require('./environment');
const { server } = require('./server');
const expressApp = require('./app');
const {
  startWebRouting,
  startApiRouting,
  moduleSpecificBootloader,
} = require('./utility/application-utility');
const { printEndpoints } = require('./utility/endpoint-utility');

// Create the http server
const httpServer = server.startServer(expressApp);

const subscriber = require('./subscriber');

/**
 * Example of how to subscribe to a channel using a userId,domain,channel input
 * this is likely to be modified to remove the term domain to be more general
 * such as "ServiceGroup" or "ChannelCategory"
 * @type {EventServiceProvider}
 */
// const eventServiceProvider = require('./providers/event-service-provider');
// eventServiceProvider.subscribeToChannel("1", "domain", "channel");

// Start the routing for the predefined modules
startWebRouting(expressApp);

// Start the routing for the API endpoints
startApiRouting(expressApp);

/* This should take records from the database and subscribe to the channels */
moduleSpecificBootloader();

// Let the server listen on a particular port
httpServer.listen(environment.values().appPort, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server listening on ${environment.values().appUrl} : ${
      environment.values().appPort
    }`,
  );
});

expressApp.use((req, res, next) => {
  return res.status(418).json("Tea only thanks.");
});

// TODO: Manage in a module
subscriber.on('message', (channel, message) => {
  console.log(`Message Received: ${message}`);
  // at the moment the channel is something like <userId>::<domain>::<channel>
  // this is no good for clients as they only register with domain
  // needs to be a suitable way to map <userId>::<domain>::<channel> to a public token
  // just like a simple string/keyword
  // this way clients connect using keyword and only get events they should
  // io.emit(channel, message);
});

printEndpoints();
