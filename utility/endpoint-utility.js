/* Used to list the routing-providers of the application in a console friendly output */
const listEndpoints = require('express-list-endpoints');
const Table = require('cli-table3');
const colors = require('colors');
const expressApp = require('../app');
const { formatFunctionName } = require('./format-utility');

const printEndpoints = () => {
  const endpoints = listEndpoints(expressApp);
  const partialHeader = ['URL'];
  const extendedHeader = ['MIDDLEWARE'];
  // First loop for unique table head
  const set = new Set();
  for (let index = 0; index < endpoints.length; index += 1) {
    // merge into unique array from endpoints[index].methods
    endpoints[index].methods.reduce((s, e) => s.add(e), set);
  }
  const header = [...partialHeader, ...[...set], ...extendedHeader];
  const table = new Table({ head: header });
  for (let index = 0; index < endpoints.length; index += 1) {
    const arr = [];
    endpoints[index].methods.forEach((e) => {
      if (header.indexOf(e) !== -1) {
        arr.push(header.indexOf(e));
      }
    });
    const row = [];
    row.push(endpoints[index].path.replace(/\\/g, ''));
    for (let i = 1; i < header.length; i += 1) {
      if (i !== header.length - 1) {
        if (arr.includes(i)) {
          // set to green yes
          row[i] = { content: colors.green('Y'), hAlign: 'center' };
        } else {
          // set to null
          row[i] = { content: colors.red('X'), hAlign: 'center' };
        }
      } else {
        const middlewares = endpoints[index].middlewares.map((v) =>
          formatFunctionName(v),
        );
        row[i] = {
          content: colors.blue(middlewares.toString()),
          hAlign: 'center',
        };
      }
    }
    table.push(row);
  }

  // eslint-disable-next-line no-console
  console.log(table.toString()); // Print the table to console
};

module.exports = { printEndpoints };
