import Nav from "./components/nav"
import { useState, useEffect } from "react";

const ToDoList = () => {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput === '') {
      alert('Enter your task!');
    } else {
      const newTask = {
        id: new Date().getTime(),
        text: taskInput,
      };
      setTasks([...tasks, newTask]);
    }

    setTaskInput('');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <section>
      <div className="container">
        <h1>
          My To-Do List<span style={{ fontSize: '30px' }}>&#128221;</span>
        </h1>

        <div className="myTaskInput">
          <input
            type="text"
            id="taskInput"
            placeholder="Add task here"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button onClick={addTask}>ADD</button>
        </div>
        <ul id="taskContainer">
          {tasks.map((task) => (
            <li key={task.id}>
              {task.text}
              <span onClick={() => deleteTask(task.id)}>delete</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ToDoList;