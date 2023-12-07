import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

export default function NavBar() {
  return (
    <div>
        <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="register">SignUp</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}