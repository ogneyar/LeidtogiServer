import React from 'react'
import InfoPage from './InfoPage'
import './Specials.css'


const Specials = () => {
    return (
        <InfoPage>
            <div className="Specials">
                <label className="SpecialsTitle">Акции!</label>
                <div className="SpecialsBody">
                    <span>Лёгкий старт</span>
                    -
                    <label>скидка в 20%</label>
                </div>
            </div>
        </InfoPage>
    )
}

export default Specials

