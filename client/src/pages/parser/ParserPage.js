import React, { useEffect, useState } from 'react'
import { fetchParser } from '../../http/paserAPI';



const ParserPage = () => {

    const [state, setState] = useState("")

    useEffect(() => {
        fetchParser().then(data => setState(data))
    },[])

    return (
        <div>
            {state && state !== {} 
            ? 
                state
            : "пусто"}
        </div>
    )
}

export default ParserPage;
