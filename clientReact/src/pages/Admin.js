import React, { useState, useContext, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'
import DeleteType from '../components/modals/DeleteType'
import DeleteBrand from '../components/modals/DeleteBrand'
import DeleteDevice from '../components/modals/DeleteDevice'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import {fetchDevices} from '../http/deviceAPI'

import '../styles/Admin.css';


const Admin = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {        
        fetchDevices(null, null, 1, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setSelectedType({})
            device.setSelectedBrand({})
        })
    },[])

    const [typeVisible, setTypeVisible] = useState(false)
    const [brandVisible, setBrandVisible] =  useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false)
    const [deleteBrandVisible, setDeleteBrandVisible] = useState(false)
    const [deleteDeviceVisible, setDeleteDeviceVisible] = useState(false)

    return (
        <Container className="d-flex flex-column Admin">
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <hr/>
            <Button 
                variant={"outline-danger"} 
                className="mt-4 p-2"
                onClick={() => setDeleteTypeVisible(true)}
            >
                Удалить тип
            </Button>
            <Button 
                variant={"outline-danger"} 
                className="mt-4 p-2"
                onClick={() => setDeleteBrandVisible(true)}
            >
                Удалить бренд
            </Button>
            <Button 
                variant={"outline-danger"} 
                className="mt-4 p-2"
                onClick={() => setDeleteDeviceVisible(true)}
            >
                Удалить устройство
            </Button>
            
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <DeleteType show={deleteTypeVisible} onHide={() => setDeleteTypeVisible(false)}/>
            <DeleteBrand show={deleteBrandVisible} onHide={() => setDeleteBrandVisible(false)}/>
            <DeleteDevice show={deleteDeviceVisible} onHide={() => setDeleteDeviceVisible(false)}/>
            
        </Container>
    )
})

export default Admin
