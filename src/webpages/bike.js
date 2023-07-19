import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {tkn, secret_key} from '../constants/global';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import logo from '../brose.svg';
import logo_bike from '../bike.png';
import logo_good from '../good.png';
import logo_bad from '../bad.webp';
import { Link } from "react-router-dom";

const Bike = () => {
    let { id } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [bike, setBike] = useState([]);

    useEffect(() => {

        fetch(`https://brose-antriebstechnik--qafc.sandbox.my.salesforce.com/services/apexrest/id?s=${secret_key}&id=` + id, {
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
                setBike(data);
                console.log(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    })

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    if (bike) {
        const icons = Array(3).fill(logo_bad);
        const icon_checks = Array(3).fill(false);

        if(bike[0].Bike_Messages__r){
            for(let i = 0; i < bike[0].Bike_Messages__r.records.length; i++){
                if(bike[0].Bike_Messages__r.records[i].Name == "DU quick check" && !icon_checks[0]){
                    icons[0] = logo_good;
                    icon_checks[0] = true;
                }

                if(bike[0].Bike_Messages__r.records[i].Name == "Display quick check" && !icon_checks[1]){
                    icons[1] = logo_good;
                    icon_checks[1] = true;
                }

                if(bike[0].Bike_Messages__r.records[i].Name == "Battery quick check" && !icon_checks[2]){
                    icons[2] = logo_good;
                    icon_checks[2] = true;
                }
            }
        }

        return (
            <div className="container">

                <Navbar bg="" variant="light">
                    <Nav className="container-fluid">
                        <Nav.Item>
                            <h2>{bike[0].Plant__r.Name}</h2>
                        </Nav.Item>
                        <Nav.Item className="ml-auto bg-myRed">
                            <Navbar.Brand>
                                <Link to={`/`}><img src={logo} /></Link>
                            </Navbar.Brand>
                        </Nav.Item>
                    </Nav>
                </Navbar>

                <div className="content">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="row no-gutters">
                                    <div className="col-auto">
                                        <img src={logo_bike} class="img-fluid" alt="" />
                                    </div>
                                    <div className="col">
                                        <div className="card-block px-2">
                                            <h4>{bike[0].Name}</h4>
                                            <b>Serial Number:</b> {bike[0].Serial_Number__c} <br />
                                            <b>Bike ID:</b> {bike[0].Bike_ID__c} <br />
                                            <b>Frame Number:</b> {bike[0].Frame_Number__c ? bike[0].Frame_Number__c : <b><span className="text-danger">Frame number is missing!</span></b>}
                                        </div>
                                    </div>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Production Date: {bike[0].Production_Date__c}</li>
                                    <li className="list-group-item">Drive Unit quick check <img src={icons[0]} class="img-good-bad" /></li>
                                    <li className="list-group-item">Display quick check <img src={icons[1]} class="img-good-bad" /></li>
                                    <li className="list-group-item">Battery quick check <img src={icons[2]} class="img-good-bad" /></li>
                                    <li className="list-group-item">Created by: {bike[0].CreatedBy.Name}</li>
                                </ul>
                                <div class="card-body">
                                    <Button variant="primary" size="sm">Contact Support</Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header"><h5>Drive Unit</h5></div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{bike[0].HWG_Bike_Model_Variant__r.HWG_Drive_Unit__r.Name}</li>
                                    <li className="list-group-item">{bike[0].HWGBST_Drive_Unit_Firmware_Version__c}</li>
                                </ul>
                            </div>
                            <br />
                            <div className="card">
                                <div className="card-header"><h5>HMI</h5></div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{bike[0].HWG_Bike_Model_Variant__r.HWG_Display__r.Name}</li>
                                </ul>
                            </div>
                            <br />
                            <div className="card">
                                <div className="card-header"><h5>Battery</h5></div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{bike[0].HWG_Bike_Model_Variant__r.HWG_Battery__r.Name}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bike;