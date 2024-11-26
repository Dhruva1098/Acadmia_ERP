const StudentList = ({ students }) => {
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
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.studentId}</td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.address}</td>
                <td>{student.domain}</td>
                <td>{student.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default StudentList;