import { useState } from 'react';

const StudentForm = ({ addStudent }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    photographUrl: '',
    domain: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="my-3">Register New Student</h2>
      <div className="mb-3">
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
      <div className="mb-3">
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
      <div className="mb-3">
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
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
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
      <div className="mb-3">
        <label className="form-label">Domain</label>
        <select
          className="form-control"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          required
        >
          <option value="">Select Domain</option>
          <option value="IMTech CSE">IMTech CSE</option>
          <option value="MTech CSE">MTech CSE</option>
          <option value="IMTech ECE">IMTech ECE</option>
          <option value="MTech ECE">MTech ECE</option>
          <option value="MS CSE">MS CSE</option>
          <option value="MS ECE">MS ECE</option>
        </select>
      </div>
      <div className="mb-3">
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
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
};

export default StudentForm;