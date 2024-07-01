import React, { Children, useEffect, useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Table, Form, InputGroup, ListGroup, ListGroupItem } from 'react-bootstrap';
import logo from '../brose.svg';
import { menu } from "../config/menu";
import { fetchData } from "../helpers/api";

/**
 * This app consumes the services exposed on QAFC apex class GetOrderProducts. The connection is done through the
 * connected app: First Spirit
 * 
 * @Test AccountId for testing: 0011p00002DLQu7AAH and 0011p00002DLQu7AAH. Both have more than 5 orders.
 */

const OrderProduct = () => {
    const location = useLocation();
    const { pathname } = location;
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');

    let routeToken = 'https://brose-antriebstechnik--qafc.sandbox.my.salesforce.com/services/oauth2/token';
    let optionsToken = {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: '3MVG97ZwUE6kNctejR367sCoVKGsgtn4XYlYgcDVmAqGm4p3Z77UhqBM_nMEGJxu1l4E.k_EXXncs0cR4WZzN',
            client_secret: '5C549AB7F2133BD354C98ACB8F9DD9904C3C0155E151E1FE5EF1BBAFF29994EC'
        })
    };

    useEffect(() => {
        const fetchToken = async () => {
            const auth = await fetchData(routeToken,optionsToken);

            const routeOrders = 'https://brose-antriebstechnik--qafc.sandbox.my.salesforce.com/services/apexrest/orderproduct/s/1234/id/0011p00002DLQu7AAH';
            const optionsOrders = {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${auth.access_token}`
                }
            };
            const data = await fetchData(routeOrders,optionsOrders);
            setOrders(data);
        };

        fetchToken();
    }, []);

    // console.log(orders);


    const anyKeyFilter = item => obj => Object.values(obj).includes(item);
    //console.log(orders.filter(anyKeyFilter('2203613')));

    const result = orders.map(item => (
        //console.log(item.OrderItems.records)
        item.OrderItems.records.filter(anyKeyFilter('Nutmutter (C13572-104)'))
    ));

    console.log(result);

    /*
    const result = orders
    .map(item => ({
        ...item,
        children: item.children?.filter(child => Object.values(child).includes('28'))
    }))
    console.log(result);
    //.filter(item => item.children.length > 0)
    */
    

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
        <h3>Orders</h3>
        <br />

        <Form>
            <InputGroup>
                <Form.Control 
                onChange = {(e) => setSearch(e.target.value)}
                placeholder='Search in orders'
                />
            </InputGroup>
        </Form>
        
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>OrderNumber</th>
                        <th>PO Date</th>
                        <th>Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    
                    /*orders.filter((item) => {
                        return search.toLowerCase() === '' ? item : (
                            item.OrderNumber.toLowerCase().includes(search.toLowerCase()) || item.PoDate.toLowerCase().includes(search.toLowerCase())
                        )
                    })
                    */

                    //const anyKeyFilter = item => obj => Object.values(obj).includes(item);

                    orders.filter(item => obj => Object.values(obj).includes('2023-08-30'))
                    
                    .map((item) => (
                        <tr key={item.OrderNumber}>
                            <td><div className="d-flex position-relative"><Link>{item.OrderNumber}</Link></div></td>
                            <td><div className="">{item.PoDate}</div></td>
                            <td><div className="">{item.Status}</div></td>
                            <td><div className="">{item.TotalAmount}</div></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    </div>
}

export default OrderProduct;