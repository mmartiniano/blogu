import React from 'react'
import '../../stylesheets/lune.css'

/* 
* Logo
*
* By now, Blogu logo is just its name
*
* props
*   - size: small | medium | large
*   - color: lune pallet
*/

export default function Logo(props) {

    const style = `logo ${props.size} ${props.color}-text`

    return (
        <div className={style}>Blogu</div>
    )
    
}