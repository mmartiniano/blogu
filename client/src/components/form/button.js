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

    let levelStyle

    switch (props.level) {
        case 'success':
            levelStyle = 'green green-border'
            break

        case 'warning':
            levelStyle = 'orange orange-border'
            break

        case 'danger':
            levelStyle = 'red red-border'
            break

        default:
            levelStyle = 'transparent highlight-border'
            break;
    }

    return (
        <div className="input-field">
            <button className={levelStyle} type={props.type} label={props.label} onClick={props.onClick}>{props.label}</button>
        </div>
    )
}