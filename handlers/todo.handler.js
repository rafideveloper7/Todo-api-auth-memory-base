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
        
        const newTodo = {
            id: todos.length + 1,
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
    res.send("delete route");
};
const updateTodo = async (req, res) => {
    res.send('update route')
};

module.exports = { getTodosHandler, createTodoHandler, deleteTodo, updateTodo };