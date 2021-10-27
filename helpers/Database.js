/* eslint-disable */

const dbParameters = require('../knexfile');
// eslint-disable-next-line import/order
const knex = require('knex')(dbParameters);

/* eslint-enable */

module.exports = knex;
