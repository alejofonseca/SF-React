import React from 'react';

function Button(props){

    return <button type="submit" disabled={props.isPending}>{props.children}</button>
}

export default Button;