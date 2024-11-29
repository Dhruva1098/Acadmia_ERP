import React from 'react';
import { Navbar as BootstrapNavbar, Form, Container, Button } from 'react-bootstrap';

function Navbar({ onSearch, onLogout, isAuthenticated }) {
  return (
    <BootstrapNavbar 
      style={{ 
        backgroundColor: '#282828',
        padding: '15px 0',
      }} 
      expand="lg" 
      fixed="top" 
      className="shadow-sm"
    >
      <Container>
        <BootstrapNavbar.Brand 
          className="fw-bold" 
          style={{ 
            color: '#F9F6EF',
            fontSize: '1.4rem',
            letterSpacing: '0.5px'
          }}
        >
          Student Management
        </BootstrapNavbar.Brand>
        <div className="d-flex gap-3 align-items-center">
          <Form.Control
            type="search"
            placeholder="Search by name..."
            className="me-2"
            style={{ 
              width: '280px',
              backgroundColor: '#F9F6EF',
              border: 'none',
              padding: '10px 15px'
            }}
            onChange={(e) => onSearch(e.target.value)}
          />
          {isAuthenticated && (
            <Button 
              variant="outline-light" 
              onClick={onLogout}
              style={{ 
                borderColor: '#EDA398',
                color: '#F9F6EF',
                padding: '8px 20px'
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar; 