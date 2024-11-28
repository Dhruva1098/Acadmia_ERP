import { useState } from 'react';

const StudentForm = ({ onStudentAdded, domains }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    photographUrl: '',
    domainId: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentToAdd = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      photographUrl: formData.photographUrl,
      domain: { id: parseInt(formData.domainId) },
      gender: formData.gender,
    };

    try {
      const response = await fetch('http://localhost:8080/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentToAdd),
      });

      if (response.ok) {
        const newStudent = await response.json();
        onStudentAdded(newStudent);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          photographUrl: '',
          domainId: '',
          gender: '',
        });
        alert('Student added successfully!');
      } else {
        alert('Failed to add student');
      }
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <h2 className="mb-4">Register New Student</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea
          className="form-control"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          rows="2"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Photograph URL</label>
        <input
          type="url"
          className="form-control"
          name="photographUrl"
          value={formData.photographUrl}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Domain</label>
          <select
            className="form-control"
            name="domainId"
            value={formData.domainId}
            onChange={handleChange}
            required
          >
            <option value="">Select Domain</option>
            {domains.map((domain) => (
              <option key={domain.id} value={domain.id}>
                {domain.program}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-control"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Register Student
      </button>
    </form>
  );
};

export default StudentForm;