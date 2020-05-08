import React from 'react'
import '../../stylesheets/lune.css'

/* 
* Button component
*
* props
*   - type: set button type
*       values: submit | clear | none
*       default: none
*   
*   - label: set label value
*
*   - onClick
*       values: callback function
*/

export default function Button(props) {

    return (
        <div className="input-field">
            <button type={props.type} label={props.label} onClick={props.onClick}>{props.label}</button>
        </div>
    )
}