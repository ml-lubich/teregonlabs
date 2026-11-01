// Keep raw request parsing here so the handler can enforce its 16 KB cap
// before JSON decoding. The shared Node handler owns validation and streaming.
const handler = require('../../lib/guide/handler');

module.exports = handler;
module.exports.config = {
  api: { bodyParser: false },
};
