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

    //console.log(orders);

    const anyKeyFilter = item => obj => {
        //Object.values(obj).filter(e => e.includes(item));
        return Object.values(obj);
        //console.log(Object.values(obj));
    };

    const multiFilter = order => {
    

        const orderProduct = order.OrderItems.records.filter((item) => {
            return item.ProductName__c.toLowerCase().includes(search)
        });
        console.log('orderProduct:', orderProduct);
        const valor = '8013W000007VqMsQAK';
/*
        return search === '' ? order : (
            order.OrderNumber.toLowerCase().includes(search) || order.PoDate.toLowerCase().includes(search) || order.Status.toLowerCase().includes(search)
            || orderProduct.OrderId?.includes(order.Id)
        )
*/
        return orderProduct.length !== 0 ? order.Id.includes(orderProduct[0].OrderId) : null
    };

    /*
    const results = orders.map(order => (
        order.OrderItems.records.filter((item) => {
            return item.ProductName__c.toLowerCase().includes(search)
        })
    ));
    */

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
        <h3>Orders</h3>
        <br />

        <Form>
            <InputGroup>
                <Form.Control 
                    onChange = {
                        (e) => setSearch(e.target.value.toLowerCase())
                    }
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
/*
                    orders.filter((item) => {
                        return search.toLowerCase() === '' ? item : (
                            item.OrderNumber.toLowerCase().includes(search.toLowerCase()) || item.PoDate.toLowerCase().includes(search.toLowerCase())
                        )
                    })
*/

                    orders.filter((item) => multiFilter(item))
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