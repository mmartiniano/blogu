import React from 'react'
import '../../stylesheets/lune.css'

/* 
* Card component
*
* props
*   - round: rounded or not
*       values: true | false
*       default: true
*   
*   - color: lune color pallete
*
*   - shadow:
*       values: true | false
*       default: true
*/

export default function Card(props) {

    return (
        <div onClick={props.onClick} className={`card ${props.className || ''} ${props.round ? 'round' : ''} ${props.shadow ? 'shadow' : ''} ${props.color || ''} ${props.className}`}>
            {props.children}
        </div>
    )
    
}