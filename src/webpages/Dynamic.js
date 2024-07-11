import React from "react";

const Dynamic = () => {
    const renderFromJSON = (jsonData) => {
        const { componentType } = jsonData;
        const Component = require(`./${componentType}`).default;
        return <Component />;
    };

    const jsonData = {
        componentType: 'Login',
        props: { title: 'Dynamic Title', content: 'This is dynamic content' }
    };

    return <>
    Dynamic<br /><br />
    
    {renderFromJSON(jsonData)}
    </>
}

export default Dynamic;