import React from 'react'
import { Link } from "react-router-dom";

import '../../stylesheets/lune.css'

import Navbar from './navbar'

export default function BloguNavbar(props) {

    return (
        <Navbar logo="Blogu" logoLink="/" fixed={true} hover={true} ulPosition="right">
            <Link to="/"><li title="Feed"><i className="material-icons">trip_origin</i></li></Link>
            <Link to="/"><li title="Blog"><i className="material-icons">library_books</i></li></Link>
            <Link to="/account"><li title="Account"><i className="material-icons">person</i></li></Link>
            <Link to="/"><li title="Log out"><i className="material-icons">exit_to_app</i></li></Link>
        </Navbar>
    )
}