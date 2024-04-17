import React from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../brose.svg';
import menu from '../config/menu.json';

const Bikes = () => {
    const location = useLocation();
    const { pathname } = location;
    const id = location.state?.id;

    //console.log(pathname);
    return (
        <div className="container">
            <Navbar collapseOnSelect className="navbar" expand="lg" bg="light" variant="light">
                <Navbar.Brand className="navbar-brand bg-myRed" as={Link} to ="/"><img src={logo} alt="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='navbar-nav ms-auto' activeKey={pathname}>
                        {menu.map(item => 
                            ('submenu' in item) ? 
                                (
                                <NavDropdown title={item.label} key={item.label} active={item.submenu.find(({ to }) => to === pathname)}>
                                    {item.submenu.map(submenu1 =>
                                        <NavDropdown.Item className="nav-link" href={submenu1.to} key={submenu1.label} active={submenu1.to===pathname}>{submenu1.label}</NavDropdown.Item>
                                    )}
                                </NavDropdown>
                                )
                            :
                                (
                                <NavLink className="nav-link" to={item.to} key={item.label}>{item.label}</NavLink>
                                )
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Bikes;