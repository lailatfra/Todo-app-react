const API_URL = "http://localhost:8080/todos";

function TodoItem({ todo, refreshTodos, onViewDetail, onToggleStatus }) {
  const toggleTodo = async (e) => {
    e.stopPropagation(); 
    await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
    });
    refreshTodos();
  };

  const deleteTodo = async (e) => {
    e.stopPropagation();
    if (window.confirm("Apakah Anda yakin ingin menghapus todo ini?")) {
      await fetch(`${API_URL}/${todo.id}`, {
        method: "DELETE",
      });
      refreshTodos();
    }
  };

  return (
    <li className="todo-item" onClick={() => onViewDetail(todo)}>
      <div className="todo-content">
        <label className="checkbox-wrapper" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={todo.status === "done"}
            onChange={toggleTodo}
            className="todo-checkbox"
          />
        </label>
        
        <div className="todo-info">
          <span className={`todo-title ${todo.status === "done" ? "done" : ""}`}>
            {todo.title}
          </span>
          {todo.description && (
            <span className="todo-description-hint">
              <svg width="12" height="12" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ada deskripsi
            </span>
          )}
        </div>
        
        <button onClick={deleteTodo} className="btn-delete" onMouseDown={(e) => e.stopPropagation()}>
          Hapus
        </button>
      </div>
    </li>
  );
}

export default TodoItem;