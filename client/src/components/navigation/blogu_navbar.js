import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context'

import '../../stylesheets/lune.css'

import Navbar from './navbar'

export default function BloguNavbar(props) {

    const context = useContext(Context)

    return (
        <Navbar logo="Blogu" logoLink="/" fixed={true} hover={true} ulPosition="right">
            <Link to="/" onClick={() => {context.setPublishing(false)}}><li title="Feed"><i className="material-icons">trip_origin</i></li></Link>
            <Link to="/"><li title="Blog"><i className="material-icons">library_books</i></li></Link>
            <Link to="/account"><li title="Account"><i className="material-icons">person</i></li></Link>
            <Link to="/" onClick={context.publishing ? null : () => {context.setPublishing(true)}}><li title="Create Post"><i className="material-icons">create</i></li></Link>
        </Navbar>
    )
}