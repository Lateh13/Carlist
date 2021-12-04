import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Button, Stack } from '@mui/material';
import Addcar from './Addcar';
import Editcar from './Editcar';

export default function Carlist() {
    const [cars, setCars] = useState([]);

    const gridRef = useRef();

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(error => console.error(error))
    }

    const deleteCar = (url) => {
        fetch(url, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(error => console.error(error))
    }

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(error => console.error(error))
    }

    const updateCar = (car, url) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(error => console.error(error))
    }

    const columns = [
        {headerName: "Brand", field:"brand", sortable: true, filter: true, resizable: true, width:150},
        {headerName: "Model", field:"model", sortable: true, filter: true, resizable: true, width:150},
        {headerName: "Color", field:"color", sortable: true, filter: true, resizable: true, width:150},
        {headerName: "Fuel", field:"fuel", sortable: true, filter: true, resizable: true, width:150},
        {headerName: "Year", field:"year", sortable: true, filter: true, resizable: true, width:150},
        {headerName: "Price", field:"price", sortable: true, filter: true, resizable: true, width:150},
        {headerName: "Edit", field: "_links.self.href", sortable: false, filter: false, width:130, 
        cellRendererFramework: params => {
            return (<Editcar updateCar={updateCar} car={params.data} />)}
        },
        {headerName: "Delete", field: "_links.self.href", sortable: false, filter: false, width:130, 
        cellRendererFramework: params => {
            const url = params.value;
            return (<Button size="small" color="error" onClick={() => deleteCar(url)}>Delete</Button>)}
        }
    ]

    return (
        <div className="ag-theme-material"style={{height:'700px',width:'100%',margin:'auto'}}>
            <Stack direction="row">
                <Addcar saveCar={saveCar}/>
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

