import React, { useEffect, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import TypeBar from '../TypeBar'
import BrandBar from '../BrandBar'
import DeviceList from '../DeviceList'
import { Context } from '../../pages/_app'
import { fetchBrands, fetchTypes, fetchDevices } from '../../http/deviceAPI'
import Pages from '../Pages.js'


const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setSelectedType({})
            device.setSelectedBrand({})
        })
    },[])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    },[device.page, device.selectedType, device.selectedBrand])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>            
        </Container>
    )
})

export default Shop
