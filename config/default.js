var pass = require('./connect.json');
module.exports = {
  port: 4460,
  session: {
      secret: pass.skey,
      key: pass.pkey,
      maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/insurance', useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true
}