import React, { useEffect, useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import { fetchPochta } from '../../http/deliveryAPI'
import { fetchProductSizes } from '../../http/productAPI'
import getDateTime from '../../service/delivery/getDateTime'
import getPack from '../../service/delivery/getPack'
import getService from '../../service/delivery/getService'
import { Context } from '../..'


const DeliveryPochta = observer((props) => {

    const { user } = useContext(Context)

    useEffect(() => {
        if (user.user.address) {
            let address = user.user.address
            let result = address.match(/\d\d\d\d\d\d/)
            if (result.index !== -1) {
                setIndex(address.substring(result.index, result.index + 6))
            }
        }
    },[user?.user?.address])

    const [info, setInfo] = useState({})
    const [index, setIndex] = useState("")

    const onClickButton = async () => {
        
        const size = await fetchProductSizes(props?.id)

        let weight = size?.weight * 1000
        
        let { pack } = getPack(size?.width, size?.height, size?.length)

        setInfo({name:"", transName:"", payNds:"", deliveryMin:""})
        let { date, time } = getDateTime()

        let dogovor = ""
        let warning, nogabarit, sms = false
        let { service } = getService(warning, nogabarit, sms)
        
        const response = await fetchPochta("101000", index, weight, pack, date, time, service, dogovor)

        if (response?.errors) alert(response?.errors[0]?.msg)
        else setInfo(response)
    }
    

    return (
        <div className="mt-3 mb-3">
            <div>
                
                {info?.name
                ?
                    <div className="mt-3 mb-3">
                        <div>{info?.name} {info?.transName && <>({info?.transName})</>}</div>
                        {info?.payNds ? <div>Стоимость с НДС: {info?.payNds} р.</div> : null}
                        {info?.deliveryMin 
                        ? 
                            <div>Срок доставки:&nbsp;
                                {info?.deliveryMin === info?.deliveryMax 
                                ? info?.deliveryMin 
                                : 
                                    <>от {info?.deliveryMin} - {info?.deliveryMax}</>
                                } д.</div> 
                        : null}
                    </div>
                :null
                }
                <div className="d-flex flex-row align-items-center">
                    <label  className="mr-2">Ваш индекс: </label>
                    <Form.Control 
                        value={index}
                        style={{width:"120px"}}
                        maxLength="6"
                        type="number"
                        onChange={e => setIndex(e.target.value)}
                        className='mb-2' 
                        placeholder="Индекс" 
                    />
                    </div>
                <Button
                    onClick={onClickButton}
                >
                    Расчитать доставку
                </Button>

            </div>
        </div>
    )
})

export default DeliveryPochta