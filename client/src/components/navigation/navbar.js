import React from 'react'
import '../../stylesheets/lune.css'

import { Link } from 'react-router-dom'

/* 
* Navbar component
*
* props
*   - fixed: turn navbar position to fixed
*       values: true | false
*       default: false
*   
*   - main: Logo name
*
*   - mainLink: Logo link
*
*   - align
*       values: left | center | right
*
*   - ulPosition:
*       values: left | center | right
*
*   - hover
*       values: true | false
*/

export default function Navbar(props) {

    return (
        <nav class={`navbar bold ${props.fixed ? 'fixed' : ''} ${props.align}`}>
            <Link to={props.mainLink}>{props.main}</Link>
            <ul className={`${props.ulPosition} ${props.hover? 'hover' : ''}`}>
                {props.children}
            </ul>
        </nav>
    )
}