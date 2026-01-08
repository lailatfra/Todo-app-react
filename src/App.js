import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import "./App.css";

const API_URL = "http://localhost:8080/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());
  const [showSplash, setShowSplash] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchTodos = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodoDetail = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();
      setSelectedTodo(data);
      setShowDetail(true);
    } catch (err) {
      console.error("Error fetching todo detail:", err);
    }
  };

  const addTodo = async (title, description, time) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title: `${title} - ${time}`, 
        description: description || "" 
      }),
    });
    fetchTodos();
    setShowPopup(false);
  };

  const updateTodo = async (id, title, description, time) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title: `${title} - ${time}`,
        description: description || "" 
      }),
    });
    fetchTodos();
    setEditingTodo(null);
    setShowPopup(false);
    setShowDetail(false);
  };

  const toggleTodoStatus = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
    });
    fetchTodos();
    if (selectedTodo && selectedTodo.id === id) {
      fetchTodoDetail(id);
    }
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
    setShowDetail(false);
    setSelectedTodo(null);
  };

  const openDetail = (todo) => {
    fetchTodoDetail(todo.id);
  };

  const openEditPopup = (todo) => {
    const match = todo.title.match(/^(.*?) - (\d{2}:\d{2})$/);
    const title = match ? match[1] : todo.title;
    const time = match ? match[2] : "09:00";
    
    setEditingTodo({
      id: todo.id,
      title,
      time,
      description: todo.description || ""
    });
    setShowPopup(true);
    setShowDetail(false);
  };

  const handleSaveTodo = (title, description, time) => {
    if (title.trim() === "") return;
    
    if (editingTodo) {
      updateTodo(editingTodo.id, title, description, time);
    } else {
      addTodo(title, description, time);
    }
  };

  const completedCount = todos.filter((t) => t.status === "done").length;
  const pendingCount = todos.filter((t) => t.status === "pending").length;
  const totalCount = todos.length;

  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          <div className="splash-icon">
            <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="splash-title">My Tasks</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <div className="header-card">
          <div className="header-content">
            <div className="header-info">
              <h1 className="app-title">My Tasks</h1>
              <p className="date-text">
                {dateTime.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <p className="time-text">
                {dateTime.toLocaleTimeString('id-ID')}
              </p>
            </div>
            <button className="header-icon" onClick={() => {
              setEditingTodo(null);
              setShowPopup(true);
            }}>
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card stat-total">
              <p className="stat-number">{totalCount}</p>
              <p className="stat-label">Total</p>
            </div>
            <div className="stat-card stat-pending">
              <p className="stat-number">{pendingCount}</p>
              <p className="stat-label">Pending</p>
            </div>
            <div className="stat-card stat-done">
              <p className="stat-number">{completedCount}</p>
              <p className="stat-label">Done</p>
            </div>
          </div>
        </div>

        <TodoList 
          todos={todos} 
          refreshTodos={fetchTodos}
          onViewDetail={openDetail}
          onToggleStatus={toggleTodoStatus}
        />
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <TodoForm 
              addTodo={handleSaveTodo} 
              closePopup={() => {
                setShowPopup(false);
                setEditingTodo(null);
              }}
              editingTodo={editingTodo}
            />
          </div>
        </div>
      )}

      {showDetail && selectedTodo && (
        <div className="popup-overlay" onClick={() => setShowDetail(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <TodoDetail 
              todo={selectedTodo}
              closePopup={() => setShowDetail(false)}
              onEdit={() => openEditPopup(selectedTodo)}
              onToggleStatus={() => toggleTodoStatus(selectedTodo.id)}
              onDelete={() => {
                if (window.confirm("Apakah Anda yakin ingin menghapus todo ini?")) {
                  deleteTodo(selectedTodo.id);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;