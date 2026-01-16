let todos = [];

const getTodosHandler = async (req, res) => {
    res.status(200).json({
        isSuccess: true,
        data: todos
    });
};

const createTodoHandler = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        if (!title) {
            return res.status(400).json({
                isSuccess: false,
                message: "Title is required"
            });
        }

        const todoId = todos.forEach((todo, index) => {
        todo.Id = index + 1
    })
        
        const newTodo = {
            id: todoId,
            title,
            description: description || "",
            completed: false,
            createdAt: new Date().toString()
        };
        
        todos.push(newTodo);
        
        res.status(201).json({
            isSuccess: true,
            message: "Todo created successfully",
            data: newTodo
        });
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "Failed to create todo",
            error: error.message
        });
    }
};

const deleteTodo = async (req, res) => {
    // ID ko get karo req
    const id = req.params.id;

    //convert ID to type Number
    const Id = parseInt(id)

    // checking this id todo exist 
    const targetId = todos.findIndex((todo) => todo.id === Id);

    if(targetId === -1) {
        return res.send('todo not fund!')
    }

    // now delete the target todo from aray
    todos.splice(targetId, 1);

    // re-arrange the todo id
    todos.forEach((todo, index) => {
        todo.Id = index + 1
    })

    res.send({
        isSuccess: true,
        message: "Todo deleted Successfully"
    })

};

const updateTodo = async (req, res) => {
    res.send('update route')
};

module.exports = { getTodosHandler, createTodoHandler, deleteTodo, updateTodo };