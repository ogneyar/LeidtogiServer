import React from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps'


export default function DeliveryBusinessLines() {
    return (
        <div
            className="mt-3 mb-3"
        >
            <YMaps>
                <Map 
                    // defaultState={{ 
                    state={{ 
                        // Широта, Долгота
                        // center: [55.75, 37.57], // Москва
                        center: [48.177645, 40.802384], // Белая Калитва
                        // type: 'yandex#hybrid',
                        type: 'yandex#map',
                        zoom: 10
                    }} 
                    width="1080px" 
                    height="400px" >
                
                    <Placemark 
                        // geometry={[55.684758, 37.738521]} 
                        geometry={[48.19, 40.802384]} 
                        options={{
                            // preset: "islands#yellowStretchyIcon"
                            preset: "islands#dotIcon"
                        }} />
                
                </Map>
            </YMaps>
        </div>
    )
}
