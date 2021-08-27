import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { LIMIT } from '../../utils/consts'
import { Context } from '../..'

import './Limit'


const Limit = observer(() => {

    const { user, product } = useContext(Context)

    let limit = localStorage.getItem('limit') || LIMIT
    const [state, setState] = useState(limit)
        

    const change = (e) => {
        // console.log(e.target.value);

        setState(e.target.value)
        localStorage.setItem('limit', e.target.value)

        product.setLimit(e.target.value)

        product.setPage(1)
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
                {user.user?.id === 1
                ?
                <>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="20">20</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                    <option value="50">50</option>
                    <option value="96">96</option>
                    <option value="100">100</option>
                </>
                : 
                <>
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                    <option value="96">96</option>
                </>
                }
                
                
            </select>
        </div>
    )
})

export default Limit
