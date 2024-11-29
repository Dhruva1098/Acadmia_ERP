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
      <Table hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th style={{width: '120px'}}>Student ID</th>
            <th style={{width: '180px'}}>Name</th>
            <th style={{width: '200px'}}>Email</th>
            <th style={{width: '130px'}}>Phone</th>
            <th style={{width: '200px'}}>Address</th>
            <th style={{width: '100px'}}>Gender</th>
            <th style={{width: '150px'}}>Program</th>
            <th style={{width: '100px'}}>Actions</th>
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
                  className="btn btn-sm"
                  title="Delete student"
                  style={{
                    backgroundColor: '#EDA398',
                    color: '#282828'
                  }}
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