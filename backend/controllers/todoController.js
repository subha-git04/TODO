import Todo from "../models/todoModel.js";

// Get all todos for logged in user
export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
};

// Add new todo
export const addTodo = async (req, res) => {
  const { todo } = req.body;
  const newTodo = await Todo.create({ user: req.user._id, todo });
  res.status(201).json(newTodo);
};

// Update todo
export const updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }
  todo.isCompleted = !todo.isCompleted;
  await todo.save();
  res.json(todo);
};

// Delete todo
export const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }
  await todo.deleteOne();
  res.json({ message: "Todo deleted" });
};
