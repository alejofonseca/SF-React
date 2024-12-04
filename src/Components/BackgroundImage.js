import React from "react";

const BackgoundImage = ({image, children}) => {
    
    // console.log(image);

    return <>
        {/* <div 
            style={{
                backgroundImage: `url(${image})`,
                backgroundRepeat:"no-repeat",
                backgroundSize:"contain",
                height: '100vw',
                opacity:0.4
            }}
            className="homepage-image">
                {children}
        </div> */}

        <header>
            <img src={image} alt="Freedom Blog" className="background" />
            {children}
        </header>
    </>
}

export default BackgoundImage;