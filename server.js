const express = require('express');
const app = express();

app.use(express.json());

const authRouter = require('./routes/auth.routes.js');
const todoRouter = require('./routes/todo.routes.js');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todos', todoRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server is up on port - ${PORT} local host .`);
});