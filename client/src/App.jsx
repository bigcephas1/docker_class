import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/api/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (text.trim()) {
      const response = await axios.post('http://localhost:5000/api/todos', {
        text
      });
      setTodos([...todos, response.data]);
      setText('');
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t._id === id);
    const response = await axios.put(`http://localhost:5000/api/todos/${id}`, {
      completed: !todo.completed
    });
    setTodos(todos.map(t => t._id === id ? response.data : t));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="todo-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo._id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
