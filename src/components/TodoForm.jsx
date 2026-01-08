import { useState, useEffect } from "react";

function TodoForm({ addTodo, closePopup, editingTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); 
  const [time, setTime] = useState("09:00");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || ""); 
      setTime(editingTodo.time);
    } else {
      setTitle("");
      setDescription(""); 
      setTime("09:00");
    }
  }, [editingTodo]);

  const handleSubmit = () => {
    if (title.trim() === "") return;
    addTodo(title, description, time); 
  };

  return (
    <div className="popup-form">
      <div className="popup-header">
        <h2 className="popup-title">
          {editingTodo ? "Edit Todo" : "Tambah Todo Baru"}
        </h2>
        <button className="popup-close" onClick={closePopup}>
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="popup-body">
        <div className="form-field">
          <label className="form-label">Nama Todo</label>
          <input
            type="text"
            placeholder="Masukkan nama todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="todo-input"
            autoFocus
          />
        </div>

        <div className="form-field">
          <label className="form-label">Deskripsi (Opsional)</label>
          <textarea
            placeholder="Masukkan deskripsi..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="todo-textarea"
            rows="3"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Waktu</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="time-input"
          />
        </div>

        <button onClick={handleSubmit} className="btn-submit">
          {editingTodo ? "Update Todo" : "Tambah Todo"}
        </button>
      </div>
    </div>
  );
}

export default TodoForm;