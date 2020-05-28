import React from 'react'
import '../stylesheets/lune.css'
import FormMessage from '../components/form/form_message'
import Button from '../components/form/button'
import IconMessage from '../components/general/icon_message'

import AuthService from '../services/auth_service'
import { Context } from '../context'

/*
* Blogu Account page
*
* Show user info, logout, delete and update actions
*
*/

class Account extends React.Component {

    static contextType = Context

    constructor(props) {
        super(props)

        this.state = {
            message: '',
            switch: true,
            user: undefined
        }
    }

    toggle = () => {
        this.setState({ switch: !this.state.switch, message: '' })
    }

    
    logout = () => {
        this.context.togglePreloader()

        AuthService.logout()

        this.context.toggleAuth()

        this.context.togglePreloader()

        this.props.history.push("/")
        window.location.reload()
    }

    componentDidMount() {
        this.setState({
            user: this.context.user
        })
    }


    render() {

        return (
            <React.Fragment>
                {this.state.user ? (
                    <div className="content flex flex-column middle">
                        <div>{this.state.user.name}</div>
                        <Button onClick={this.logout} label="Log out"/>
                    </div>
                ) : (
                    <div className="content flex middle center">
                        {this.state.message && (
                            <IconMessage icon="person" message="Could not load user data"/>
                        )}
                    </div>
                )}
            </React.Fragment>
        )
    }
}


export default Account