import React from 'react'
import '../../stylesheets/lune.css'

/* 
* Form submit message component
* TO DO change to just Message
*
* props
*   - type: set message type
*       values: warning | fail | success
*       default: warning
*   
*   - text: set message text
*/

export default function FormMessage(props) {

    let color = ''

    switch (props.type) {
        case 'fail':
            color = 'red-text'
            break;
        case 'success':
            color = 'green-text'
            break;
        default:
            color = 'yellow-text'
            break;
    }

    return (
        <div className={'form-message ' + color}>{props.text}</div>
    )
}