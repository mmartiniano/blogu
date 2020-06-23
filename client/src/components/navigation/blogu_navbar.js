import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context'

import '../../stylesheets/lune.css'

import Navbar from './navbar'

export default function BloguNavbar(props) {

    const context = useContext(Context)

    const cancelPublish = () => {
        context.setPost(undefined)
        context.setPublishing(false)
    }

    const publish = () => {
        if (context.publishing)
            return
        else
            context.setPublishing(true)
        
    }

    return (
        <Navbar logo="Blogu" logoLink="/" fixed={true} hover={true} ulPosition="right">
            <Link to="/" onClick={cancelPublish}><li title="Feed"><i className="material-icons">trip_origin</i></li></Link>
            <Link to="/"><li title="Blog"><i className="material-icons">library_books</i></li></Link>
            <Link to="/account"><li title="Account"><i className="material-icons">person</i></li></Link>
            <Link to="/" onClick={publish}><li title="Create Post"><i className="material-icons">create</i></li></Link>
        </Navbar>
    )
}