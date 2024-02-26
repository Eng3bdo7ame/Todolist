import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function TaskList({ todos, filter, handleDelete }) {
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
    <Droppable droppableId="todos">
      {(provided) => (
        <ul {...provided.droppableProps} ref={provided.innerRef}>
          {filteredTodos.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo.id} index={index}>
              {(provided) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  {todo.text}
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
