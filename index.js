#!/usr/bin/env node
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
const { bindToPort } = require('./utility/os-bind-utility');

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

expressApp.use((req, res, next) => {
  return res.status(418).json('Tea only thanks.');
});

// Handle IO connection here for 2 way
// communication. This should eventually
// be removed into another dependency.
const io = require('socket.io')(httpServer);

io.on('connection', function (socket) {
  console.log(`${socket.id} : connected`);
  socket.on('message', function (msg) {
    console.log(`message : ${msg} socket : ${socket.id}`);
  });
  socket.on('disconnect', function () {
    console.log(`socket disconnected : ${socket.id}`);
  });
  socket.emit('message', 'Hello world');
});

// TODO: Manage in a module
subscriber.on('message', (channel, message) => {
  console.log(`Message Received: ${message}`);
  // at the moment the channel is something like <userId>::<domain>::<channel>
  // this is no good for clients as they only register with domain
  // needs to be a suitable way to map <userId>::<domain>::<channel> to a public token
  // just like a simple string/keyword
  // this way clients connect using keyword and only get events they should
  io.emit(channel, message);
});

printEndpoints();

// We need an external function to
// handle this business logic so we can mock
// the app to test the endpoints.
bindToPort(httpServer);

module.exports = expressApp;
