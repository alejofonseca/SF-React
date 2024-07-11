import React, { useState, useEffect } from 'react';

function Input(props){

    let [username, setUsername] = useState(props.username);

    useEffect(() => {
        setUsername(props.username);
    }, [props.username]);

    function usernameInputHandler(event){
        setUsername(event.target.value);
    }

    //console.log('render input');

    return <>
        Input
        <input type="text" className="form-control" value={username} onChange={usernameInputHandler} required />
    </>
}

export default Input;