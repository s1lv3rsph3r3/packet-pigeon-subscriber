const dotEnv = require('dotenv');
const path = require('path');

dotEnv.config({ path: `${path.resolve(__dirname, '.env')}` });

module.exports = (function start() {
  const kv = {
    // Server settings
    appPort: process.env.APP_PORT,
    appUrl: process.env.APP_URL,
    appDebug: process.env.APP_DEBUG,
  };
  const values = () => kv;
  return {
    values,
  };
})();
