import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

function App() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'form'

  // Fetch students from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/students')
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, []);

  // Add a new student and update the list
  const addStudent = (newStudent) => {
    fetch('http://localhost:8080/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((savedStudent) => {
        setStudents((prevStudents) => [...prevStudents, savedStudent]);
        setView('list'); // Go back to the list after submission
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-3">
        <button className="btn btn-primary" onClick={() => setView('list')}>
          Student List
        </button>
        <button className="btn btn-success" onClick={() => setView('form')}>
          Register
        </button>
      </div>

      {view === 'list' ? (
        <StudentList students={students} />
      ) : (
        <StudentForm addStudent={addStudent} />
      )}
    </div>
  );
}

export default App;