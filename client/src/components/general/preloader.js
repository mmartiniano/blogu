import React from 'react'
import '../../stylesheets/lune.css'

/* 
* Preloader
*
* Display a preloader at page top
*
* props
*   - type: indeterminate | determinate
*   - default: indeterminate
*   
*/

export default function Preloader(props) {

    return (
        <div className="preloader inderterminate secondary"/>
    )
    
}