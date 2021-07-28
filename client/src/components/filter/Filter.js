import React from 'react'

import Limit from './Limit'
import Sort from './Sort'

import './Filter.css'


const Filter = () => {
    return (
        <div
            className="Filter"
        >
            <Sort />
            <Limit />
        </div>
    )
}

export default Filter
