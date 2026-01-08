import TodoItem from "./TodoItem";

function TodoList({ todos, refreshTodos, onViewDetail, onToggleStatus }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="empty-text">Belum ada todo. Yuk tambah sekarang!</p>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            refreshTodos={refreshTodos}
            onViewDetail={onViewDetail}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;