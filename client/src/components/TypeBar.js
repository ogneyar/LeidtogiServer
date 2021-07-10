import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'
import { Context } from '..'


const TypeBar = observer(() => {
    const {product} = useContext(Context)
    return (
        <ListGroup style={{cursor: "pointer"}}>
            <ListGroup.Item 
                active={undefined === product.selectedType.id}
                onClick={() => product.setSelectedType({})}
                key={0}
            >
                Все типы
            </ListGroup.Item>
            {product.types.map(type => 
                <ListGroup.Item 
                    active={type.id === product.selectedType.id}
                    onClick={() => product.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>   
            )}
        </ListGroup>
    )
})

export default TypeBar
