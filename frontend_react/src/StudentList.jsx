import React from 'react';
import { Table } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

function StudentList({ students, domains, onDelete }) {
  const getDomainName = (student) => {
    const domain = domains.find(domain => 
      domain.students.some(s => s.id === student.id)
    );
    return domain ? domain.program : 'Not Assigned';
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/students/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        onDelete(id);
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Program</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.studentId}</td>
              <td>{`${student.firstName} ${student.lastName}`}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.address}</td>
              <td>{student.gender}</td>
              <td>{getDomainName(student)}</td>
              <td>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="btn btn-danger btn-sm"
                  title="Delete student"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {students.length === 0 && (
        <div className="text-center mt-4">
          <p>No students found</p>
        </div>
      )}
    </div>
  );
}

export default StudentList; 