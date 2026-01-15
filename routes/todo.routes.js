const express = require('express');
const router = express.Router();

const { getTodosHandler, createTodoHandler, deleteTodo, updateTodo } = require('../handlers/todo.handler.js');
const {authenticateToken} = require('../middleware/auth.middleware.js')

// get route
router.get('/', authenticateToken, getTodosHandler);
// post route user create new todos
router.post('/', authenticateToken, createTodoHandler);
// delete route user delete todos
router.delete('/', authenticateToken, deleteTodo);
//update todo route
router.put('/', authenticateToken, updateTodo)


module.exports = router;

