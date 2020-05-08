import React from 'react'
import '../../stylesheets/lune.css'


/* 
* Divider text
*
* Render a text between hr
*
* props
*   - text
*   
*   - classes: CSS classes to be applied in the text
*/

export default function DividerText(props) {

    const classes = `divider-text ${props.classes}`

    return (
        <div className="flex middle center divider-text-wrapper">
            <hr className="divider"/>
            <span className={classes}> {props.text} </span>
        </div>
    )
    
}