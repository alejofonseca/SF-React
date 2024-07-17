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
    const [sortField, setSortField] = useState(''); 

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
            'menu': ['OrderNumber', 'PO Date', 'Status', 'Amount'],
            'itemsLocation': 'OrderItems.records',
            'cType': 'Input'
        }
    };

    useEffect(() => {
        const fetchToken = async () => {
            const auth = await fetchData(routeToken,optionsToken);

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
    //console.log(orders);



    const anyKeyFilter = item => obj => {
        return Object.values(obj);
        //console.log(Object.values(obj));
    };


//const order = {OrderNumber:"1700813" ,Status: "Draft", TotalAmount: 2300, OrderItems: {records: [{product: "product1", quantity: 53}]}};
const criteria_root = ['OrderNumber','PoDate','Status'];
const lineitems_location = 'OrderItems.records';
const criteria_lineitems = ['ProductName__c']; // filtrar desde antes para eliminar el location: 'OrderItems.records.ProductName__c' -> 'ProductName__c'

const lineitems_location_arr = lineitems_location.split('.');
/*
    let orderItem = order;
    lineitems_location.split('.').forEach(item => {
        orderItem = orderItem[item] ? orderItem[item] : null;
    });
    //console.log(orderItem);
*/

// const arr = [3, 9, 6, 1];
// arr.sort((a, b) => a - b);
// console.log(arr); // [1, 3, 6, 9]

// https://blog.logrocket.com/creating-react-sortable-table/
const data = [
    { name: "ibas", age: 100 },
    { name: "doe", age: 36 }
];
const data1 = [...data].sort((a, b) => {
    console.log(a, b);
    return (a.name < b.name ? -1 : 1)
});
console.log(data,data1);


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
        

        /* org
        const orderProduct = order.OrderItems?.records.filter((item) => {
            return item.ProductName__c.toLowerCase().includes(search)
        });
        //console.log('orderProduct:', orderProduct);
        //console.log(order);
        */
        
        if(search === ''){
            return order;
        } else {
            for(var i=0; i<criteria_root.length; i++) {
                order[criteria_root[i]]?.toLowerCase().includes(search) ? filtered_orders.push(true) : filtered_orders.push(false);
            }
        }

        return filtered_orders.includes(true) || (orderProduct && order.Id.includes(orderProduct[0]?.OrderId)) ? order : null;
        


        /*
        return search === '' ? order : (
            order.OrderNumber.toLowerCase().includes(search) || order?.PoDate?.toLowerCase().includes(search) || order.Status.toLowerCase().includes(search)
            || (orderProduct && order.Id.includes(orderProduct[0]?.OrderId)) // validate orderProduct exists from line above, then gets its OrderId
        )
        */
        
    };

    const handleSortingChange = (index) => {
        //console.log(orders);
        setSortField(index);
        handleSorting(index);
    };

    const handleSorting = (sortField) => {
        console.log('without sort:', orders);
        const sorted = [...orders].sort((a, b) => (a[sortField].toString() < b[sortField] ? -1 : 1));
        console.log('sorted:', sorted);
    }
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
                        {/* <th>OrderNumber</th>
                        <th>PO Date</th>
                        <th>Status</th>
                        <th>Amount</th> */}

                        {resultObj.definitions.menu.map((title,index) => (
                            <th key={index} onClick={() => handleSortingChange(index)}>{title}</th>
                        ))}
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

                    orders.filter((item) => multiFilter(item, criteria_root))
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