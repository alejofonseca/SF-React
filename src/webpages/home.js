import React, {useState, useEffect} from "react";
import {tkn, secret_key} from '../constants/global';
import { Link } from "react-router-dom";
import '../App.css';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../brose.svg';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [bikes, setBikes] = useState([]);


/* original 
    useEffect(() => {
        const token = '00D0D000000D4Mh!AR0AQKMzBOurVCtDbMdK1TzS7K_J..Vc604DeGoE.ENQCzjo_q5kV7fGG5J7lE9YDxsFYc0JK.gA2c7ZP32W1alRd68Cy9oL';
        
        fetch('https://brose-antriebstechnik--qafc.sandbox.my.salesforce.com/services/apexrest/bikes?s=0011p00002DKuDgAAL0050D000006VZOFQA41689308705', {
        //fetch('https://brose-antriebstechnik--qafc.sandbox.my.salesforce.com/services/apexrest/frame?frameId=123456&s=0011p00002DKuDgAAL0050D000006VZOFQA41689308705', {
        //fetch('https://jsonplaceholder.typicode.com/users/', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setBikes(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="container">

                <Navbar bg="" variant="light">
                    <Nav className="container-fluid">
                        <Nav.Item>
                                <h1>{bikes[0].Plant__r.Name}</h1>
                        </Nav.Item>
                        <Nav.Item className="ml-auto bg-myRed">
                            <Navbar.Brand>
                                <img src={logo} />
                            </Navbar.Brand>
                        </Nav.Item>
                    </Nav>
                </Navbar>

                <div className="content">

                    <table className='table'>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Bike</th>
                                <th scope="col">Bike ID</th>
                                <th scope="col">Drive Unit</th>
                                <th scope="col">Production Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bikes.map(bike => (
                                <tr>
                                    <td key={bike.id}>
                                        <Link to={`bike/${bike.Id}`}>{bike.Name}</Link>
                                    </td>
                                    <td>
                                        {bike.Bike_ID__c}
                                    </td>
                                    <td>
                                        {bike.HWG_Bike_Model_Variant__r ? bike.HWG_Bike_Model_Variant__r.HWG_Drive_Unit__r.Name : '-- No model --'}
                                    </td>
                                    <td>
                                        {bike.Production_Date__c}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
fin original */


    useEffect(() => {
        
        fetch(`https://brose-antriebstechnik--qafc.sandbox.my.salesforce.com/services/apexrest/bikes?s=${secret_key}`, {
        // original fetch('https://brose-antriebstechnik--qafc.sandbox.my.salesforce.com/services/apexrest/bikes?s=0013W00000OHGX3QAP0053W000001UzCVQA01689691432', {
        //fetch('https://brose-antriebstechnik--qafc.sandbox.my.salesforce.com/services/apexrest/frame?frameId=123456&s=0011p00002DKuDgAAL0050D000006VZOFQA41689308705', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${tkn}`
            }
        })
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setBikes(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {

        const columns = [
            {
                dataField: "id",
                text: "Bike Name",
                sort: true
            },
            {
                dataField: "bike_id",
                text: "Bike ID",
                sort: true
            },
            {
                dataField: "drive_unit",
                text: "Drive Unit"
            },
            {
                dataField: "production_date",
                text: "Production Date",
                sort: true
            }
        ];

        const productsGenerator = () => {
            const items = [];

            bikes.map(bike => {
                items.push({ 
                    id: <Link to={`bike/${bike.Id}`}>{bike.Name}</Link>, 
                    bike_id: bike.Bike_ID__c, 
                    drive_unit: bike.HWG_Bike_Model_Variant__r ? bike.HWG_Bike_Model_Variant__r.HWG_Drive_Unit__r.Name : '-- No model --',
                    production_date: bike.Production_Date__c
                });
            });

            return items;
        };
        const products = productsGenerator();

        return (
            <div className="container">

                <Navbar bg="" variant="light">
                    <Nav className="container-fluid">
                        <Nav.Item>
                                <h1>{bikes[0].Plant__r.Name}</h1>
                        </Nav.Item>
                        <Nav.Item className="ml-auto bg-myRed">
                            <Navbar.Brand>
                                <img src={logo} />
                            </Navbar.Brand>
                        </Nav.Item>
                    </Nav>
                </Navbar>

                <div className="content">
                    <div className="App">
                        <BootstrapTable
                        //    bootstrap4
                            keyField="id"
                            data={products}
                            columns={columns}
                            pagination={paginationFactory({ sizePerPage: 50 })}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;