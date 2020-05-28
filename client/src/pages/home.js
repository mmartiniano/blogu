import React from 'react'
import '../stylesheets/lune.css'
import Logo from '../components/general/logo'
import FormMessage from '../components/form/form_message'
import LoginForm from '../components/form/login_form'
import SignupForm from '../components/form/signup_form'
import DividerText from '../components/general/divider_text'
import Button from '../components/form/button'

import AuthService from '../services/auth_service'
import { Context } from '../context'

/*
* Blogu Homepage
*
* Contains 2 forms: login and signup
* and a switch to show/hide 'em
*
*/

class Home extends React.Component {

    static contextType = Context

    constructor(props) {
        super(props)

        this.state = {
            message: '',
            switch: true
        }
    }

    toggle = () => {
        this.setState({ switch: !this.state.switch, message: '' })
    }

    login = (credentials) => {

        this.context.togglePreloader()

        AuthService.login(credentials)
        .then( response => {
            window.location.reload()
        })
        .catch( error => {
            this.setState({ message: error.response.data })
        })
        .then( this.context.togglePreloader )
    }
    
    signup = (credentials) => {

        this.context.togglePreloader()

        AuthService.signup(credentials).then( response => {
            window.location.reload()
        })
        .catch( error => {
            this.setState({ message: error.response.data })
        })
        .then( this.context.togglePreloader )
    }

    render() {

        return (
            <div className="full-screen flex middle center">
                <div className="container col l4 m6 row center single-content flex middle">
                    <div className="col s12">
                        <Logo/>
                        {this.state.message && (
                            <FormMessage type="fail" text={this.state.message}/>
                        )}
                        {this.state.switch ? (
                            <LoginForm onSubmit={this.login}/>
                        ) : (
                            <SignupForm onSubmit={this.signup}/>
                        )}
                        <DividerText text="or" classes="bold secondary"/>
                        <Button label={this.state.switch ? 'Sign Up' : 'Log in'} onClick={this.toggle}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home