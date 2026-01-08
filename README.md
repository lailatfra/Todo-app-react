# React Frontend Todo-List

Aplikasi Todo List menggunakan React dengan fitur lengkap untuk mengelola task harian.

## Teknologi

- React Hooks (useState, useEffect)
- Fetch API
- CSS custom

## Fitur

- Menampilkan daftar todo
- Menambah dan edit todo (nama, deskripsi, waktu)
- Melihat detail todo
- Toggle status (pending/done)
- Menghapus todo
- Real-time clock dan statistik
- Responsive design

## Struktur Komponen

```
App.js
├── TodoForm.jsx (Form tambah/edit)
├── TodoList.jsx (Container list)
├── TodoItem.jsx (Single item)
└── TodoDetail.jsx (Detail popup)
```

## Alur Aplikasi

### 1. Load Data
Saat aplikasi dimuat, fetch semua todo dari backend:
```javascript
GET http://localhost:8080/todos
```

### 2. Tambah Todo
- Klik tombol (+) → popup form
- Submit → `POST /todos` dengan body: `{title, description}`
- List refresh otomatis

### 3. Lihat Detail
- Klik todo item → `GET /todos/{id}`
- Popup detail muncul dengan informasi lengkap

### 4. Edit Todo
- Dari detail, klik Edit → popup form terisi data
- Submit → `PUT /todos/{id}` dengan body: `{title, description}`
- List refresh otomatis

### 5. Toggle Status
- Klik checkbox atau tombol toggle
- Request: `PUT /todos/{id}` tanpa body
- Backend toggle status otomatis

### 6. Hapus Todo
- Klik tombol Hapus → konfirmasi
- Request: `DELETE /todos/{id}`
- List refresh otomatis

## Instalasi

```bash
npm install
npm start
```

Aplikasi berjalan di `http://localhost:3000`

## Konfigurasi

Backend API endpoint di `App.js`:
```javascript
const API_URL = "http://localhost:8080/todos";
```
