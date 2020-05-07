import React from 'react'
import './stylesheets/lune.css'
import LoginForm from './components/login_form'

export default function App() {

    return (
        <div className="app row flex middle">
            <div className="container col s4 offset-s4">
                <LoginForm/>
            </div>
        </div>
    )
}
