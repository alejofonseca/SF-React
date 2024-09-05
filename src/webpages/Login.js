import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import del_icon from '../images/red-delete.svg';

const Login = () => {

    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const STATUS_IDLE = 0;
    const STATUS_UPLOADING = 1;

    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState(STATUS_IDLE);
    const [error, setError] = useState();
    const inputFile = useRef(null);

    const uploadFiles = (data) => {
        setStatus(STATUS_UPLOADING);
        fetch('/contact', {
            method: 'post',
            body: data,
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err))
        .finally(() => setStatus(STATUS_IDLE))
    }

    const packFiles = (files)=> {
        const data = new FormData();
        [...files].forEach((file, i) => {
            data.append(`file-${i}`, file, file.name)
        });
        return data;
    }

    const handleUploadClick = () => {
        if (files.length) {
            const data = packFiles(files);
            uploadFiles(data);
        }
    }

    const handleRemoveClick = (i) => {
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

    const handleFileChange = (e) => {
        setError("");
        setFiles(e.target.files);

        if(inputFile.current.files.length > 5) {
            // check that max. 5 files are selected
            inputFile.current.value = "";
            setFiles([]);
            setError("Please select maximum 5 files.");
        } else {
            // check that every file is smaller than 1MB
            for(let i = 0; i < inputFile.current.files.length; i++) {
                if(inputFile.current.files[i].size/1000 > 1024) {
                    inputFile.current.value = "";
                    setFiles([]);
                    setError("The size limit for each file is 1MB.");
                    break;
                }
            }
        }
    }

    const renderError = () => (
        error !== "" && <small className="text-danger my-1">{error}</small>
    )

    const renderFileList = () => (
    <ul className="list-group list-group-flush my-1">
        {[...files].map((f, i) => (
            <li key={i} className="list-group-item small py-1">
                <div className="row">
                    <div className="col-11">{f.name}</div>
                    <div className="col-1 d-flex justify-content-end"><Link onClick={() => handleRemoveClick(i)}><img alt='delete' src={del_icon} width={19} /></Link></div>
                </div>
            </li>
        ))}
    </ul>);

    const getButtonStatusText = () => (
        (status === STATUS_IDLE) ? 'Send' : 'Sending...'
    );

    return <>
    Login bike OEM <br /><br />

    <div>
        <input type="file" name="file" multiple 
            onChange={(e) => handleFileChange(e)} 
            className="form-control form-control-sm" 
            ref={inputFile}
            accept="application/pdf, image/jpeg, image/png, image/jpg"
        />
        {renderFileList()}
        {renderError()}
        <br />
        <button onClick={handleUploadClick} disabled={status === STATUS_UPLOADING}>
            {getButtonStatusText()}
        </button>
    </div>
    
    </>
}

export default Login;