import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { LIMIT } from '../../utils/consts'
import { Context } from '../..'

import './Limit'


const Limit = observer(() => {

    const { product } = useContext(Context)

    let limit = localStorage.getItem('limit') || LIMIT
    const [state, setState] = useState(limit)
        

    const change = (e) => {
        console.log(e.target.value);

        setState(e.target.value)
        localStorage.setItem('limit', e.target.value)

        product.setLimit(e.target.value)
    }

    return (
        <div
            className="d-flex justify-content-end align-items-center Limit"
        >            
            Показать:&nbsp;

            <select 
                value={state} 
                onChange={e => change(e)}
            >
                {/* <option disabled>количество:</option> */}
                <option name="opt1" value="3">3</option>
                <option name="opt2" value="4">4</option>
                <option name="opt3" value="6">6</option>
                <option name="opt4" value="8">8</option>
            </select>
        </div>
    )
})

export default Limit
