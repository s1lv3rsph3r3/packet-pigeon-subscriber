// eslint-disable-next-line no-unused-vars
const { Api } = require('@s1lv3rsph3r3/metropolitan');
/**
 * Example usage is as follows:
 * A simple API GET request => Api.get('/admin', (req, res) => { res.send('HELLO WORLD'); });
 * A simple API POST request => Api.post('/admin', (req, res) => { res.send('HELLO WORLD'); });
 */

/*
 * A simple ping test for the API to validate that the server is ready to
 * receive messages - Only necessary for MVP for developers.
 */
Api.get('/ping', (req, res) => {
  return res.status(200).json('pong');
});
