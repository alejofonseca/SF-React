import React, { useEffect, useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Table, Form, InputGroup, Button } from 'react-bootstrap';
import logo from '../brose.svg';
import { menu } from "../config/menu";
import { fetchData } from "../helpers/api";
import download_light from '../images/download_light.svg';

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
    const [token, setToken] = useState('');

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

    const resultObj = {
        'definitions': {
            'menu': ['OrderNumber', 'PO Date', 'Status', 'Amount', ''],
            'itemsLocation': 'OrderItems.records',
            'cType': 'Input'
        }
    };

    useEffect(() => {
        const fetchToken = async () => {
            const auth = await fetchData(routeToken,optionsToken);
            setToken(auth.access_token);

            const routeOrders = 'https://brose-antriebstechnik--qafc.sandbox.my.salesforce.com/services/apexrest/orderproduct/s/1234/id/0012400000glFyEAAU';
            const optionsOrders = {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${auth.access_token}`
                }
            };
            const data = await fetchData(routeOrders,optionsOrders);
            
            let myObj = [];
            for(let order of data) {
                if (order.OrderItems === undefined) {
                    continue;
                }

                let orderItem = order;
                resultObj.definitions.itemsLocation.split('.').forEach(item => {
                    orderItem = orderItem[item] ? orderItem[item] : null;
                });
                myObj.push({id: order.Id, lineItems: orderItem});
            }
            
            //console.log(myObj);
            setOrders(data);
        };

        fetchToken();
    }, []);
    //console.log(orders, token);

const criteria_root = ['OrderNumber','PoDate','Status'];
const lineitems_location = 'OrderItems.records';
const criteria_lineitems = ['ProductName__c']; // filtrar desde antes para eliminar el location: 'OrderItems.records.ProductName__c' -> 'ProductName__c'
const lineitems_location_arr = lineitems_location.split('.');

    const multiFilter = (order, criteria_root) => {

        let filtered_orders = [];

        let orderItem = order;
        let orderItemFinal = [];
        lineitems_location_arr.forEach(item => {
            // if Order.OrderItems.records exist - Checks the route exists
            if(orderItem[item] !== undefined && orderItem !== null){
                orderItem = orderItem[item] ? orderItem[item] : null;
                orderItemFinal = orderItem;
            }
        });
        //console.log('orderItemFinal', orderItemFinal);

        if(!Array.isArray(orderItemFinal) || orderItemFinal === null) {
            return false;
        }
        
        const orderProduct = orderItemFinal !== undefined ? orderItemFinal.filter((lineitem) => {
            for(var i=0; i<criteria_lineitems.length; i++) {
                lineitem[criteria_lineitems[i]]?.toLowerCase().includes(search) ? filtered_orders.push(true) : filtered_orders.push(false);
            }

            return lineitem;
        }) : null;
        
        if(search === ''){
            return order;
        } else {
            for(var i=0; i<criteria_root.length; i++) {
                order[criteria_root[i]]?.toLowerCase().includes(search) ? filtered_orders.push(true) : filtered_orders.push(false);
            }
        }

        return filtered_orders.includes(true) || (orderProduct && order.Id.includes(orderProduct[0]?.OrderId)) ? order : null;
    };
    //console.log(results);

    const download = async (id) => {
        const optionsAtt = {
            method: "GET",
            mode: "cors",
            headers: {
            //    'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        
        await fetch(`https://brose-antriebstechnik--qafc.sandbox.my.salesforce.com/services/data/v48.0/sobjects/Attachment/${id}/body`, optionsAtt)
        // Retrieve its body as ReadableStream
        .then((response) => {
            const reader = response.body.getReader();
            return new ReadableStream({
                start(controller) {
                    return pump();
                    function pump() {
                        return reader.read().then(({ done, value }) => {
                            // When no more data needs to be consumed, close the stream
                            if (done) {
                                controller.close();
                                return;
                            }
                            // Enqueue the next data chunk into our target stream
                            controller.enqueue(value);
                            return pump();
                        });
                    }
                },
            });
        })
        // Create a new response out of the stream
        .then((stream) => new Response(stream))
        // Create an object URL for the response
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob)) //original
        // Update image
        .then((url) => {
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file_'+Date.now()+'.pdf')
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch((err) => console.error(err));
        
        //console.log(data);
    };

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
                        {/* <th>OrderNumber</th>
                        <th>PO Date</th>
                        <th>Status</th>
                        <th>Amount</th> */}

                        {resultObj.definitions.menu.map((title,index) => (
                            <th key={index}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {orders.filter((item) => multiFilter(item, criteria_root))
                    .map((item) => (
                        <tr key={item.OrderNumber}>
                            <td><div className=""><Link>{item.OrderNumber}</Link></div></td>
                            <td><div className="">{item.PoDate}</div></td>
                            <td><div className="">{item.Status}</div></td>
                            <td><div className="">{item.TotalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, style: "currency", currency: "EUR"})}</div></td>
                            <td><div className="">
                                {item.Attachments?.records[0].Id !== undefined &&
                                <Button type="button" className="btn btn-light btn-sm" style={{'--bs-btn-padding-y': '.13rem', '--bs-btn-padding-x': '.3rem'}} onClick={(() => download(item.Attachments.records[0].Id))}>
                                    <img src={download_light} alt='download' />
                                </Button>
                                }
                            </div></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    </div>
}

export default OrderProduct;