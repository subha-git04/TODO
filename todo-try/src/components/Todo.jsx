import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "../api/axios";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);
  const [editId, setEditId] = useState(null); // 👈 to track which todo is being edited

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  // Add or Update Todo
  const handleAddOrUpdate = async () => {
    if (!todo.trim()) return;

    try {
      if (editId) {
        // ✏️ Update existing todo
        const res = await axios.put(`/todos/${editId}`, { todo });
        setTodos(todos.map((t) => (t._id === editId ? res.data : t)));
        setEditId(null);
      } else {
        // ➕ Add new todo
        const res = await axios.post("/todos", { todo });
        setTodos([...todos, res.data]);
      }
      setTodo("");
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  // Delete Todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Mark Todo Complete/Incomplete
  const handleCheckbox = async (id) => {
    try {
      const res = await axios.put(`/todos/${id}`);
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Edit Todo
  const handleEdit = (id) => {
    const t = todos.find((item) => item._id === id);
    setTodo(t.todo);
    setEditId(id);
  };

  // Filter todos (show completed only if checked)
  const visibleTodos = showFinished ? todos.filter((t) => t.isCompleted) : todos;

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-auto p-5 md:w-[40%] bg-violet-100 rounded-xl my-5">
        <h2 className="text-xl font-bold text-center mb-4">Your Todos</h2>

        {/* Add or Edit Todo */}
        <div className="flex mb-4">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="flex-1 p-2 rounded-full border"
            placeholder="Enter a todo..."
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-violet-700 text-white rounded-full px-4 ml-2"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <input
          type="checkbox"
          checked={showFinished}
          onChange={() => setShowFinished(!showFinished)}
        />
        <label className="ml-2">Show Finished</label>

        {/* Todos List */}
        <div className="mt-4">
          {visibleTodos.length === 0 ? (
            <p>No todos yet</p>
          ) : (
            visibleTodos.map((t) => (
              <div
                key={t._id}
                className="flex justify-between items-center my-2 bg-white p-2 rounded shadow"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={t.isCompleted}
                    onChange={() => handleCheckbox(t._id)}
                  />
                  <span className={t.isCompleted ? "line-through" : ""}>
                    {t.todo}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(t._id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Todo;
