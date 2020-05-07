import React from 'react'
import '../stylesheets/lune.css'

/* 
* Input component
*
* props
*   - type: set input value type
*       values: text | password | email
*       default: text
*   
*   - name: set value name
*
*   - label: set label value
*
*   - design
*       values: underline | box
*       default: underline
*
*   - required: not null flag
*       values: false | true
*       default: false
*
*   - onChange
*       values: callback function that accepts 1 value (input current value)
*
*   TO DO: validation
*/

export default function Input(props) {

    const design = props.design === "box" ? "input-box" : "input-field"

    return (
        <div className={design}>
            <input 
                name={props.name}
                placeholder={props.label}
                type={props.type}
                required={props.required}
                onChange={props.onChange}
            />
        </div>
    )
}