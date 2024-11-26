import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StudentList from './StudentList'

function App() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/students')
    .then(response => response.json())
    .then(data => setStudents(data));
  }, []);
  return (
    <div className='container'>
      <div>
        {students.length ? (
          //Display students
          <StudentList students = {students}/>
        ) : (
          <p>No students </p>
        )}
      </div>

    </div>
  )
}

export default App
