import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]); // Danh sách các công việc
  const [newTodo, setNewTodo] = useState(""); // Công việc mới
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [currentTodo, setCurrentTodo] = useState(null); // Công việc hiện tại được chỉnh sửa

  const handleAddTodo = () => {
    if (!newTodo) return; // Nếu không có công việc mới, không làm gì

    setTodos([...todos, { text: newTodo, completed: false }]); // Thêm công việc mới vào danh sách
    setNewTodo(""); // Xóa nội dung ô input sau khi thêm
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos); // Đánh dấu hoàn thành công việc
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index); // Xóa công việc khỏi danh sách
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setIsEditing(true); // Kích hoạt chế độ chỉnh sửa
    setCurrentTodo({ index, text: todos[index].text }); // Lưu lại công việc hiện tại đang chỉnh sửa
    setNewTodo(todos[index].text); // Điền nội dung công việc vào ô input
  };

  const handleSaveTodo = () => {
    const updatedTodos = todos.map((todo, i) =>
      i === currentTodo.index ? { ...todo, text: newTodo } : todo
    );
    setTodos(updatedTodos); // Lưu lại công việc đã chỉnh sửa
    setIsEditing(false); // Tắt chế độ chỉnh sửa
    setNewTodo(""); // Xóa nội dung ô input sau khi lưu
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)} // Cập nhật giá trị của công việc mới
        placeholder="Nội dung công việc"
      />
      <button onClick={isEditing ? handleSaveTodo : handleAddTodo}>
        {isEditing ? "Lưu" : "Thêm"}
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button className="edit" onClick={() => handleEditTodo(index)}>
              Chỉnh sửa
            </button>
            <button className="delete" onClick={() => handleDeleteTodo(index)}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
