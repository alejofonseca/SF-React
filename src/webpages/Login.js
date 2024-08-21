import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Login = () => {

    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const STATUS_IDLE = 0;
    const STATUS_UPLOADING = 1;

    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState(STATUS_IDLE);

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

    const renderFileList = () => (<ul className="list-group list-group-flush my-1">
        {[...files].map((f, i) => (
            <li key={i} className="list-group-item small py-1">{f.name}</li>
        ))}
    </ul>);

    const getButtonStatusText = () => (
        (status === STATUS_IDLE) ? 'Send' : 'Sending...'
    );

    return <>
    Login bike OEM <br /><br />

    <div>
        <input type="file" name="file" multiple onChange={(e) => setFiles(e.target.files)} className="form-control form-control-sm" />
        {renderFileList()}
        <br />
        <button onClick={handleUploadClick} disabled={status === STATUS_UPLOADING}>
            {getButtonStatusText()}
        </button>
    </div>
    
    </>
}

export default Login;