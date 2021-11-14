const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

app.listen(port, () => {
  console.log(`La aplicación se está ejecutando en el puerto ${port}`);
});