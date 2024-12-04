import React, { useRef, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Table, Form, InputGroup, Button } from 'react-bootstrap';
import logo from '../brose.svg';
import { menu } from "../config/menu";
import { useLocation, Link, NavLink } from "react-router-dom";

import del_icon from "../images/red-delete.svg";
import files_icon from "../images/files.svg";
import photo from "../images/photo.jpg";
import BackgoundImage from "../Components/BackgroundImage";

const Complaint = (props) => {
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [message, setMessage] = useState();
    const inputFile = useRef(null);

    const location = useLocation();
    const { pathname } = location;

    const uploadFiles = (data) => {
        // mutate({route: '/api/content/contact', jsonArray: data, method: 'post', type: 'file'}, {
        //     onSuccess: (result) => {
        //         setMessage('');
        //         inputFile.current.value = '';
        //         setFiles([]);
        //     }
        // });
    }

    const packFiles = (files)=> {
        // use FormData to pack the textarea and files
        const data = new FormData();

        // append the files
        [...files].forEach((file, i) => {
            data.append(`file-${i}`, file, file.name)
        });
        //console.log(data.get('file-0'));

        // add value property to email_fields (coming from config json) and format each field accordingly
        let emailFields = props.config.metadata.email_fields;
        emailFields = emailFields.map(field => {
            field.value = props.data[field.api_name];
            delete field['api_name'];
            return field;
        });
        //console.log(props.config);

        // append the data before sending it to backend
        const emailData = {
            //module_name: props.name,
            // language: i18n.language,
            header_fields: emailFields, // the record fields that will be included in the email
            message: message === undefined ? 'no_message' : message?.replace(/\n/g, "<br />") // replace line breaks from textarea
        };
        data.append('email_data', JSON.stringify(emailData));

        return data;
    }

    const handleUploadClick = () => {
        if (files.length !== 0 || (message !== undefined && message !== '')) {
            const data = packFiles(files);
            uploadFiles(data);
        }
    }

    const handleRemoveClick = (i,f) => {
        //console.log(inputFile.current.files);

        // remove the item from the input FileList. It must be done this way since the input.files object is read-only
        const dt = new DataTransfer();
        for(let m = 0; m < inputFile.current.files.length; m++){
            if(m !== i) {
                dt.items.add(inputFile.current.files[m]);
            }
        }
        inputFile.current.files = dt.files;

        // update files state with the new object
        setFiles(inputFile.current.files);
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleFileChange = (e) => {
        setErrorMessage("");
        setFiles(e.target.files);

        if(inputFile.current.files.length > 5) {
            // check that max. 5 files are selected
            inputFile.current.value = "";
            setFiles([]);
            setErrorMessage('error_count');
        } else {
            // check that every file is smaller than 1MB
            for(let i = 0; i < inputFile.current.files.length; i++) {
                if(inputFile.current.files[i].size/1000 > 1024) {
                    inputFile.current.value = "";
                    setFiles([]);
                    setErrorMessage('error_size');
                    break;
                }
            }
        }
    }

    const renderError = () => (
        errorMessage !== "" && <small className="text-danger my-1">{errorMessage}</small>
    )

    const renderFileList = () => (<ul className="list-group list-group-flush my-1">
        {[...files].map((f, i) => (
            <li key={i} className="list-group-item small py-1">
                <div className="row">
                    <div className="col-11">{f.name}</div>
                    <div className="col-1"><Link onClick={() => handleRemoveClick(i,f)}><img alt="remove" src={del_icon} width={17} /></Link></div>
                </div>
            </li>
        ))}
    </ul>);

    const getButtonStatusText = () => (
        'sending_form'
    );

    const fileInputRef = React.createRef();
    let a = <p>No images</p>;

    return <>
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

    <BackgoundImage image={photo}>

    <div className="container">
    <div className="row">
        <div className="col-3">
            <div className="card bg-light mt-2 mb-4">
                <div className="card-header">
                    <img alt="remove" src={files_icon} width={20} /> Files
                </div>
                <div className="card-body ctable-full">
                    <p className="">{"props.config.metadata.message"}</p>

                    <div className="row">
                        {<div className='col-12'>
                            
                            {/* <button type="file" name="file" multiple
                                onChange={(e) => handleFileChange(e)} 
                                className="form-control form-control-sm" 
                                ref={inputFile}
                                accept="application/pdf, image/jpeg, image/png, image/jpg"
                            >
                                <i className="bi bi-upload"></i> Upload the files
                            </button> */}

                        <div>
                            <button type="button" onClick={() => fileInputRef.current.click()} className="form-control form-control-sm">
                                <i className="bi bi-upload"></i> Select file (pdf, jpeg, jpg, png)
                            </button>
                            <input
                            type="file" name="file" multiple
                            accept="application/pdf, image/jpeg, image/png, image/jpg"
                            ref={fileInputRef}
                            onChange={(e) => handleFileChange(e)}
                            hidden
                            />
                            {a}
                        </div>

                            {renderFileList()}
                            {renderError()}
                        </div>}

                        {<div className='col-12'>
                            <textarea type="text" name="client_message" rows="4" className="form-control form-control-sm mb-2"
                                placeholder={"props.config.metadata.textarea_placeholder"} 
                                value={message}
                                onChange={handleMessageChange}
                            />
                        </div>}
                        
                        <div className='col-12 mt-1'>
                            <a className="btn btn-primary btn-sm" onClick={handleUploadClick}>{getButtonStatusText()}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </BackgoundImage>
    </>
}

export default Complaint;