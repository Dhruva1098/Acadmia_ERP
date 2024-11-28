import React from 'react';
import { Navbar as BootstrapNavbar, Form, Container, Button } from 'react-bootstrap';

function Navbar({ onSearch, onLogout, isAuthenticated }) {
  return (
    <BootstrapNavbar bg="white" expand="lg" fixed="top" className="shadow-sm">
      <Container fluid>
        <BootstrapNavbar.Brand className="fw-bold">Student Management</BootstrapNavbar.Brand>
        <div className="d-flex gap-3 align-items-center">
          <Form.Control
            type="search"
            placeholder="Search by name"
            className="me-2"
            style={{ width: '250px' }}
            onChange={(e) => onSearch(e.target.value)}
          />
          {isAuthenticated && (
            <Button variant="danger" onClick={onLogout}>
              Logout
            </Button>
          )}
        </div>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar; 