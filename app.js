const express = require('express');
const app = express();
const port = 3000;
const postRouter = require('./routers/appRoutes');

const errorHandler = require('./middlewares/errorsHandler');
const notFound = require('./middlewares/notFound');

app.use(express.static('public'));

app.use(express.json());

app.use('/posts', postRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
    console.log(`example listening on port ${port}`);
});