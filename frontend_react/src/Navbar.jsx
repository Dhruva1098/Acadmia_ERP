import React from 'react';
import { Navbar as BootstrapNavbar, Form, Container } from 'react-bootstrap';

function Navbar({ onSearch }) {
  return (
    <BootstrapNavbar bg="light" expand="lg" className="mb-4">
      <Container fluid>
        <BootstrapNavbar.Brand>Student Management</BootstrapNavbar.Brand>
        <div className="d-flex gap-3">
          <Form.Control
            type="search"
            placeholder="Search by name"
            className="me-2"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar; 