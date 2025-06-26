import React from "react";
import logo from '../brose.svg';
import wapp from '../images/wapp.png';
import email from '../images/email.png';
import save_contact from '../images/save_contact.png';
import customer from '../images/customer.jpg';

const QrCode = (props) => {

    return <>
    
    <div className="qr-code">
        <div className="container py-4">
            <div className="row">
                {/* logo */}
                <div className="col-lg-12" style={{backgroundColor: "Transparent"}}>
                    <img className="mx-auto d-block" src={logo} width={'40%'} alt="logo" />
                </div>
            </div>

            <div className="row">
                {/* name, role */}
                <div className="col-lg-12 py-4">
                    <center><h5>Brose Fahrzeugteile</h5></center>
                    <center><p className="qr-code-role">Automotive Inc</p></center>
                </div>
            </div>

            <div className="row">
                {/* contact buttons */}
                <div className="col-sm-2 offset-sm-3">
                    <a href="https://wa.me/4917624691493/?text=Hola%2CEstoy%20interesado%20en%20conocer%20mas%20sobre%20los%20servicios%20de%20MC" target="blank">
                        <img className="mx-auto d-block" src={wapp} width={'40px'} alt="wapp" />
                        <p className="qr-code-contact text-center">Enviar WhatsApp</p>
                    </a>
                </div>
                <div className="col-sm-2">
                    <img className="mx-auto d-block" src={email} width={'40px'} alt="email" />
                    <p className="qr-code-contact text-center">Enviar email</p>
                </div>
                <div className="col-sm-2">
                    <img className="mx-auto d-block" src={save_contact} width={'40px'} alt="save" />
                    <p className="qr-code-contact text-center">Guardar contacto</p>
                </div>
            </div>

            
        </div>

        <div className="">
            <img className="col-lg-12" src={customer} width={'100%'} alt="customer" />
        </div>

        <div className="container py-4">
            <div className="row">
                {/* Pitch phrase */}
                <div className="col-lg-12">
                    <p className="qr-code-pitch text-center">Inspiramos a las empresas para que transformen la experiencia del cliente</p>
                    <p className="qr-code-pitc-sub text-center">Elimina tiempos de respuesta, entrega información precisa y <b>reduce costos</b> en tu servicio al cliente</p>
                </div>
            </div>

            <div className="qr-code-hr"></div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="text-center"><a href="mailto:a@ac-iolf.com" className="">a@ac-iolf.com</a></div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="text-center"><a href="ac-iolf.com" className="">ac-iolf.com</a></div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="text-center"><a href="mailto:a@ac-iolf.com" className="">a@ac-iolf.com</a></div>
                </div>
            </div>

            <div className="qr-code-hr2"></div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="text-center">Síguenos: in</div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default QrCode;