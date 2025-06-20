import { useState } from 'react'
import TodoBoard from './components/ToDo'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TodoBoard />
    </>
  )
}

export default App
