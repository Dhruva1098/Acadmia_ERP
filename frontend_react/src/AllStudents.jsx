import React from 'react';

const StudentList = ({ students, setStudents }) => {
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/students/${id}`, { method: 'DELETE' })
      .then(() => {
        // Update student list after deletion
        setStudents((prev) => prev.filter((student) => student.id !== id));
      })
      .catch((error) => console.error('Error deleting student:', error));
  };

  return (
    <div>
      <h2 className="my-3">Student List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone no.</th>
            <th>Address</th>
            <th>Domain</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.studentId}</td>
              <td>
                {student.firstName} {student.lastName}
              </td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.address}</td>
              <td>{student.domain?.program}</td>
              <td>{student.gender}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;