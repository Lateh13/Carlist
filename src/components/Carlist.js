import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Button, Stack } from '@mui/material';
import Addcar from './Addcar';

export default function Carlist() {
    const [cars, setCars] = useState([]);

    const gridRef = useRef();

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    const deleteCar = (url) => {
        fetch(url, {method: 'Delete'})
        .then(result => fetchData())
        .catch(error => console.error(error))
    }

    const columns = [
        {headerName: "Brand", field:"brand", sortable: true, filter: true},
        {headerName: "Model", field:"model", sortable: true, filter: true},
        {headerName: "Color", field:"color", sortable: true, filter: true},
        {headerName: "Fuel", field:"fuel", sortable: true, filter: true},
        {headerName: "Year", field:"year", sortable: true, filter: true},
        {headerName: "Price", field:"price", sortable: true, filter: true},
        {headerName: "Delete", field: "_links.self.href", sortable: false, filter: false, 
        cellRendererFramework: params => {
            const url = params.value;
            return (<Button size="small" variant="contained" color="error" onClick={() => deleteCar(url)}>Delete</Button>)
        }}
    ]

    return (
        <div className="ag-theme-material"style={{height:'700px',width:'100%',margin:'auto'}}>
            <Stack direction="row">
                <Addcar />
            </Stack>
            <AgGridReact
                ref={gridRef}
                onGridReady={ params => gridRef.current = params.api }
                rowSelection="multiple"
                columnDefs={columns}
                rowData={cars}>
            </AgGridReact>
        </div>
    );
}

