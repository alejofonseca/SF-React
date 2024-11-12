import React from 'react';
import download_light from '../images/download_light.svg';

const ExportCSV = ({ data, fileName }) => {

    console.log(data);

    const downloadCSV = () => {
        // Convert the data array into a CSV string
        const csvString = [
        ["OrderNumber", "TotalAmount", "Product"], // Specify your headers here
        ...data.map(item => [item.OrderNumber, item.TotalAmount, item.OrderItems?.records[0].ProductName__c]) // Map your data fields accordingly
        ]
        .map(row => row.join(","))
        .join("\n");

        // Create a Blob from the CSV string
        const blob = new Blob([csvString], { type: 'text/csv' });

        // Generate a download link and initiate the download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName || 'download.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return <button type="button" className="btn btn-light btn-sm" onClick={downloadCSV}><img src={download_light} alt='download' /> Export CSV</button>;
};

export default ExportCSV;