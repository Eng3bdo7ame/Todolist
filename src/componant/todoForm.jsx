import React, { useState } from "react";
import "../style/todoForm.css";
export default function TodoForm() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(-1);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim() !== "") {
      if (editIndex === -1) {
        setTodos([...todos, { text: input, completed: false }]);
      } else {
        const newTodos = [...todos];
        newTodos[editIndex].text = input;
        setTodos(newTodos);
        setEditIndex(-1);
      }
      setInput("");
    }
  };

  const handleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setInput(todos[index].text);
    setEditIndex(index);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  });

  return (
    <>
      <div className="todo-container">
        <div className="to_do_form">
          <div className="input_form">
            <div className="form_div">
              <form onSubmit={handleSubmit} action="">
                <input
                  type="text"
                  className="task-input"
                  placeholder="Add Todo"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <button className="add-button" type="submit">
                  {editIndex === -1 ? "Add" : "Update"}
                </button>
              </form>
              <div className="filter-buttons">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("completed")}>
                  Completed
                </button>
                <button onClick={() => setFilter("uncompleted")}>
                  Uncompleted
                </button>
              </div>
            </div>
          </div>
          <ul className="task-list">
            <h4 style={{ textAlign: "center", color: "white", margin: "10px" }}>
              All taskes will show Here
            </h4>
            {filteredTodos.map((todo, index) => (
              <li
                key={index}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}>
                {editIndex === index ? (
                  <input
                    className="updata_list"
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                  />
                ) : (
                  <span onClick={() => handleEdit(index)}>{todo.text}</span>
                )}
                <button onClick={() => handleComplete(index)}>
                  {todo.completed ? "Uncomplete" : "Complete"}
                </button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
