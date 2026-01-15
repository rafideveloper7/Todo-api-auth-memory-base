const express = require('express');
const router = express.Router();

const { getTodosHandler, createTodoHandler } = require('../handlers/todo.handler.js');
const {authenticateToken} = require('../middleware/auth.middleware.js')

router.get('/', authenticateToken, getTodosHandler);
router.post('/', authenticateToken, createTodoHandler);

module.exports = router;