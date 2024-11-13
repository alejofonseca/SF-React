import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Table, Form, InputGroup, Button } from 'react-bootstrap';
import logo from '../brose.svg';
import { menu } from "../config/menu";
import { useLocation, Link, NavLink } from "react-router-dom";

/**
 * This app consumes the services exposed on QAFC apex class GetOrderProducts. The connection is done through the
 * connected app: First Spirit
 * 
 * @Test AccountId for testing: 0011p00002DLQu7AAH and 0011p00002DLQu7AAH. Both have more than 5 orders.
 */

const BikeList = () => {
    const location = useLocation();
    const { pathname } = location;
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');

    const resultObj = {
        'definitions': {
            'menu': ['Invoice Number', 'Date', 'Due Date', 'Status', 'Total','Outstanding']
        }
    };

    const data = [
        {
            InvoiceNumber: "4159360",
            Date: "10/25/2024", 
            DueDate: "11/25/2024",
            Status: "Paid",
            Total: 35000,
            OutstandingAmount: 0
        },
        {
            InvoiceNumber: "4339361",
            Date: "10/25/2024", 
            DueDate: "12/25/2024",
            Status: "Unpaid",
            Total: 42000,
            OutstandingAmount: 42000
        },
        {
            InvoiceNumber: "4159440",
            Date: "11/30/2024", 
            DueDate: "02/28/2025",
            Status: "Overdue",
            Total: 28000,
            OutstandingAmount: 28000
        },
        {
            InvoiceNumber: "4229510",
            Date: "01/12/2024", 
            DueDate: "04/12/2024",
            Status: "Paid",
            Total: 9000,
            OutstandingAmount: 0
        },
        {
            InvoiceNumber: "4339560",
            Date: "03/15/2024", 
            DueDate: "06/15/2024",
            Status: "Unpaid",
            Total: 17000,
            OutstandingAmount: 17000
        }
    ];


const criteria_root = ['InvoiceNumber','Date','Total'];
const lineitems_location = 'OrderItems.records';
const criteria_lineitems = ['ProductName__c']; // filtrar desde antes para eliminar el location: 'OrderItems.records.ProductName__c' -> 'ProductName__c'
const lineitems_location_arr = lineitems_location.split('.');

    const multiFilter = (order, criteria_root) => {
        let filtered_orders = [];
        let orderItemFinal = [];

        if(!Array.isArray(orderItemFinal) || orderItemFinal === null) {
            return false;
        }
        
        if(search === ''){
            return order;
        } else {
            for(var i=0; i<criteria_root.length; i++) {
                order[criteria_root[i]]?.toString().toLowerCase().includes(search) ? filtered_orders.push(true) : filtered_orders.push(false);
            }
        }
        return filtered_orders?.includes(true) ? order : null;
    };
    //console.log(results);

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
        <h3>Invoices</h3>
        <br />

        <Form>
            <InputGroup>
                <Form.Control 
                    onChange = {
                        (e) => setSearch(e.target.value.toLowerCase())
                    }
                    placeholder='Search in invoices'
                />
            </InputGroup>
        </Form>
        <br />
        
        <Container>
            <Table className="table table-hover">
                <thead>
                    <tr>
                        {resultObj.definitions.menu.map((title,index) => (
                            <th key={index}><div style={{"textAlign": title==='Total' || title==='Outstanding' ? "right" : 'left'}}>{title}</div></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.filter((item) => multiFilter(item, criteria_root))
                    .map((item) => (
                        <tr key={item.InvoiceNumber} className={item.Status==='Overdue' ? "table-danger" : null}>
                            <td><div className="">{item.InvoiceNumber}</div></td>
                            <td><div className="">{item.Date}</div></td>
                            <td><div className="">{item.DueDate}</div></td>
                            <td><div className=""><i className="bi bi-flag"></i>{item.Status}</div></td>
                            <td><div className="" style={{"textAlign": "right"}}>{item.Total.toLocaleString('en-US', {minimumFractionDigits: 2, style: "currency", currency: "USD"})}</div></td>
                            <td><div className="" style={{"textAlign": "right"}}>{item.OutstandingAmount.toLocaleString('en-US', {minimumFractionDigits: 2, style: "currency", currency: "USD"})}</div></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    </div>
}

export default BikeList;