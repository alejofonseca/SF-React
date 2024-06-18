import React, { useEffect, useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, ListGroup, ListGroupItem } from 'react-bootstrap';
import logo from '../brose.svg';
import { menu } from "../config/menu";

const FirstSpirit = () => {
    const location = useLocation();
    const { pathname } = location;
    let [accounts, setAccounts] = useState();;

    useEffect(() => {
        const token = '00D0Q0000000NTh!AQEAQOPspe_jzPx5BRNNq11D4UXSNBiMOFKPhp2cGWsOZCxEPz5H9L2YSVODhWY75xB4pinVF0LixxlLJ3xsJgGMNfGgYMes';
        
        fetch('https://brose-antriebstechnik--brosedev.sandbox.my.salesforce.com/services/apexrest/acctstodisplay/s/C0ZKoOzxd5DXwZI90bqWJlPGjKoFk3eA333DGIVzb1jcuQeCH3xmiWawvwek5laf', {
        //fetch('https://mindful-otter-e85qhb-dev-ed.trailblaze.my.salesforce.com/services/apexrest/orders/s/1234/id/CD451796', {
        //fetch('https://jsonplaceholder.typicode.com/photos', {
        //fetch('https://jsonplaceholder.typicode.com/users/', {
            method: "GET",
            mode: "cors",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(
            (data) => {
                //console.log(data);
                setAccounts(data);
            },
            (error) => {
                return error;
            }
        )
    }, []);

    return <div className="container">
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

        <br />
        <h3>Visible Accounts</h3>
        <br />
        
        <div className="col-sm-4 ps-3">
            {accounts?.map((acct) => 
            <>
            <ListGroup>
                <ListGroupItem key={acct.Id}>
                    <b>{acct.Name}</b><br />
                    {acct.BillingStreet}<br />
                    {acct.BillingPostalCode}, {acct.BillingCity}<br />
                    {acct.BillingCountry}<br />
                    <hr></hr>
                    {acct.Email__c}<br />
                    Phone: {acct.Phone}<br />
                    <Link to={`https://${acct.Website}`} target="_blank">{acct.Website}</Link><br />
                </ListGroupItem>
            </ListGroup>
            <br />
            </>
            )}
        </div>
    </div>
}

export default FirstSpirit;