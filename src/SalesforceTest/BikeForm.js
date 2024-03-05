import React, { useState, useEffect } from 'react';
import Button from './Button';

function BikeForm(props){

    let [errorMessage, setErrorMessage] = useState('');

    let options1 = {
        title: "Menu",
        width: 100,
        height: 200
    };
    let {width: w, height: h, title} = options1;

    let options2 = {
        title: "Menu",
        width: 200,
        height: 200
    };

    let {width: w2, height: h2, title2} = options2;
    // console.log(w);
    // console.log(w2);

    let [username, setUsername] = useState(props.username);
    console.log('render form');

    useEffect(() => {
        setUsername(props.username);
    }, [props.username]);

    function usernameInputHandler(event){
        setUsername(event.target.value);
    }

    function onSubmit(event){
        event.preventDefault();
        let user = {
            username: username.current?.value ? username.current.value : username.current,
            client_id: 5,
            created_by: 100,
            last_login: null,
            active: false
        }
        props.formSubmit(user);
    }

    return <>
        <div className="row g-3">
            <div className="col-sm-12 d-flex flex-row gap-2">
                <h2 className="text-h2">Create Bike - {props.bikeID}</h2>
                <div><span className={`badge rounded-pill align-items-top`}>Free: 10</span></div>
            </div>
        </div>

        <form onSubmit={onSubmit}>
        <div className="row g-3">
            <div className="col-sm-2 d-inline-flex">
                <input type="text" className="form-control" value={username} onChange={usernameInputHandler} required />
            </div>

            <div className="col-sm-6">
                <Button>Create Bike</Button>
            </div>
        </div>
        </form>
    </>
}

export default BikeForm;