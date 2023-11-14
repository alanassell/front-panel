import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navBar.css'



const NavegationBar = () => { 

  const navegar = useNavigate()

  let user = JSON.parse(localStorage.getItem("user"));

  const cerrarSesion = () =>{
      localStorage.removeItem("user")

      navegar("/")
  }

  const navLinks = () =>{
      if(user.rol=== "admin" && user.grupo.length > 0){
        return(
          <Nav className="me-auto">
            <Link to="/jugadores">Jugadores</Link>
            <Link to="/eventos">Eventos</Link>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Mesas"
              menuVariant="dark"
            >
             <NavDropdown.Item to="#action/3.1">
                <Link to="/mesas">Mesas en Juego</Link>    
              </NavDropdown.Item>
              <NavDropdown.Item to="#action/3.2">
                <Link to="/mesasfinalizadas">Mesas Finalizadas</Link>    
                </NavDropdown.Item>
                <NavDropdown.Item to="#action/3.2">
                <Link to="/filtrarmesas">Filtar Mesas</Link>    
                </NavDropdown.Item>
            </NavDropdown>   
          </Nav>
        )
      }
      if(user.rol=== "representante"){
        return(
          <Nav className="me-auto">
            <Link to="/grupos">Grupos</Link>   
            <Link to="/usuarios">Usuarios</Link>
            <Link to="/jugadores">Jugadores</Link>
            <Link to="/eventos">Eventos</Link>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Mesas"
              menuVariant="dark"
            >
              <NavDropdown.Item to="#action/3.1">
                <Link to="/mesas">Mesas en Juego</Link>    
              </NavDropdown.Item>
              <NavDropdown.Item to="#action/3.2">
                <Link to="/mesasfinalizadas">Mesas Finalizadas</Link>    
                </NavDropdown.Item>
                <NavDropdown.Item to="#action/3.2">
                <Link to="/filtrarmesas">Filtar Mesas</Link>    
                </NavDropdown.Item>
            </NavDropdown>     
          </Nav>
        )
      }
      else if(user.rol=== "agente"){
        return(
          <Nav className="me-auto">
            <Link to="/grupos">Grupos</Link>   
            <Link to="/usuarios">Usuarios</Link>
            <Link to="/jugadores">Jugadores</Link>
            <Link to="/eventos">Eventos</Link>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Mesas"
              menuVariant="dark"
            >
              <NavDropdown.Item to="#action/3.1">
                <Link to="/mesas">Mesas en Juego</Link>    
              </NavDropdown.Item>
              <NavDropdown.Item to="#action/3.2">
                <Link to="/mesasfinalizadas">Mesas Finalizadas</Link>    
                </NavDropdown.Item>
              <NavDropdown.Item to="#action/3.2">
                <Link to="/filtrarmesas">Filtar Mesas</Link>    
                </NavDropdown.Item>
            </NavDropdown>   
            <Link to="/balance">Balance</Link>
          </Nav>
        )
      }else{
        null
      }
  }

  if(!user){
    return(
      <></>
    )
  }
  else{
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/home">Panel TGDM</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {navLinks()}
            <Nav>
              <Container className='d-flex'>
                <Link className='px-0'><span className="material-symbols-outlined">person</span></Link>
                <Link className='px-1'>{user.name.toUpperCase()} - {user.rol.toUpperCase()}</Link>
                <Link className='px-3 ms-auto'onClick={()=>{cerrarSesion()}}><span className="material-symbols-outlined">logout</span></Link>  
              </Container>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )}
}

export default NavegationBar