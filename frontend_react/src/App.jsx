import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import Navbar from './Navbar';
import Login from './components/Login';
import Footer from './Footer';
import { authenticatedFetch } from './utils/api';

function App() {
  const [students, setStudents] = useState([]);
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        setIsAuthenticated(false);
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/auth/status', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            // Token expired or invalid
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        await fetchDomains();
        await fetchStudents();
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchStudents = async () => {
    try {
        const response = await authenticatedFetch('http://localhost:8080/api/students');
        if (response.ok) {
            const data = await response.json();
            setStudents(data);
        }
        setLoading(false);
    } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
    }
  };

  const fetchDomains = async () => {
    try {
        const response = await authenticatedFetch('http://localhost:8080/api/domain');
        if (response.ok) {
            const data = await response.json();
            setDomains(data);
        }
    } catch (error) {
        console.error('Error fetching domains:', error);
    }
  };

  const handleDelete = (deletedId) => {
    setStudents(prevStudents => 
      prevStudents.filter(student => student.id !== deletedId)
    );
  };

  const handleStudentAdded = (newStudent) => {
    setStudents(prevStudents => [...prevStudents, newStudent]);
    setShowForm(false);
  };

  const filteredStudents = students.filter(student => {
    const nameMatch = (student.firstName + ' ' + student.lastName)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch;
  });

  const handleLogin = (authData) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // Add periodic token check
  useEffect(() => {
    if (isAuthenticated) {
        const interval = setInterval(checkAuthStatus, 10000); // Check every 10 seconds
        return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleTokenExpired = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    window.addEventListener('tokenExpired', handleTokenExpired);
    return () => window.removeEventListener('tokenExpired', handleTokenExpired);
  }, []);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <Navbar 
        onSearch={setSearchTerm}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />
      <div className="main-content">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Student Management System</h1>
            <button 
              className="btn btn-primary" 
              onClick={() => setShowForm(!showForm)}
              style={{ fontSize: '0.9rem', padding: '8px 16px' }}
            > 
              {showForm ? 'Hide Form' : 'Add New Student'}
            </button>
          </div>
          
          {showForm && (
            <div className="mb-4">
              <StudentForm 
                domains={domains} 
                onStudentAdded={handleStudentAdded}
              />
            </div>
          )}

          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <StudentList 
              students={filteredStudents} 
              domains={domains} 
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;