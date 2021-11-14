const entitiesRouter = require('./entities.router');

function routerApi(app) {
  app.use('/entities', entitiesRouter);
}

module.exports = routerApi;
