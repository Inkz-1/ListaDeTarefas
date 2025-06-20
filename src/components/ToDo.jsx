import { useState, useEffect } from 'react';
import { BsTrash3 } from "react-icons/bs";

export default function TodoBoard() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(true);
  const messages = ["Não deixe suas tarefas para depois", "O que você vai fazer hoje?","Algum plano em mente?"];

  useEffect(() => {
    const currentText = messages[textIndex];
    let typingTimeout;

    if (!deleting && charIndex <= currentText.length) {
      typingTimeout = setTimeout(() => {
        setDisplayedText(currentText.substring(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, 90);
    } else if (!deleting && charIndex > currentText.length) {
      typingTimeout = setTimeout(() => {
        setDeleting(true);
      }, 1200); // pausa antes de começar a apagar
    } else if (deleting && charIndex >= 0) {
      typingTimeout = setTimeout(() => {
        setDisplayedText(currentText.substring(0, charIndex));
        setCharIndex((prev) => prev - 1);
      }, 40);
    } else if (deleting && charIndex < 0) {
      setDeleting(false);
      setTextIndex((prev) => (prev + 1) % messages.length);
      setCharIndex(0);
    }

    return () => clearTimeout(typingTimeout);
  }, [charIndex, deleting, textIndex]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, id: Date.now() }]);
    setInput('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">
        {displayedText}
        <span className="cursor">|</span>
      </h2>

      <div className="todo-input-wrapper">
        <input
          className="todo-input"
          placeholder="Escreva uma nova tarefa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask} className="todo-add-btn">+</button>
      </div>

      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className="todo-item">
            <span>{task.text}</span>
            <button onClick={() => removeTask(task.id)} className="todo-delete-btn">
              <BsTrash3 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}