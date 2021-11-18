const dotEnv = require('dotenv');
const path = require('path');

dotEnv.config({ path: `${path.resolve(__dirname, '.env')}` });

module.exports = (function start() {
  const kv = {
    // Database settings for this module
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbDatabase: process.env.DB_DATABASE,
  };
  const values = () => kv;
  return {
    values,
  };
})();
