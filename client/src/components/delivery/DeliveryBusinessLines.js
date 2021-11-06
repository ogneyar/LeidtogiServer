import React, { useState } from 'react'
// eslint-disable-next-line
import { YMaps, Map, Placemark } from 'react-yandex-maps'


export default function DeliveryBusinessLines() {

    const [ latitude, setLatitude ] = useState(48.177645)
    const [ longitude, setLongitude ] = useState(40.802384)

    return (
        <div
            className="mt-3 mb-3"
        >

            <input type="text" value={latitude} onChange={e => setLatitude(e.target.value)} />
            <input type="text" value={longitude} onChange={e => setLongitude(e.target.value)} />

            <YMaps>
                <Map 
                    // defaultState={{ 
                    state={{ 
                        // Широта (latitude), Долгота (longitude)
                        // center: [55.75, 37.57], // Москва
                        // center: [48.177645, 40.802384], // Белая Калитва
                        center: [latitude, longitude], // Белая Калитва
                        // type: 'yandex#hybrid',
                        type: 'yandex#map',
                        zoom: 10
                    }} 
                    width="1080px" 
                    height="400px" >
                
                    {/* <Placemark 
                        // geometry={[55.684758, 37.738521]} 
                        geometry={[48.19, 40.802384]} 
                        options={{
                            // preset: "islands#yellowStretchyIcon"
                            preset: "islands#dotIcon"
                        }} /> */}
                
                </Map>
            </YMaps>
        </div>
    )
}
