import React from 'react'
import '../stylesheets/lune.css'
import FormMessage from '../components/form/form_message'
import Button from '../components/form/button'
import IconMessage from '../components/general/icon_message'

import AuthService from '../services/auth_service'
import UserService from '../services/user_service'
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
            editing: true,
            user: undefined
        }
    }

    toggle = () => {
        this.setState({ editing: !this.state.editing, message: '' })
    }

    
    logout = () => {
        this.context.togglePreloader()

        AuthService.logout()

        this.context.toggleAuth()

        this.context.togglePreloader()

        this.props.history.push("/")
        window.location.reload()             
    }

    delete = () => {
        this.context.togglePreloader()

        UserService.delete()

        .then( () => {
            AuthService.logout()
            this.context.toggleAuth()
            this.context.togglePreloader()
            this.props.history.push("/")
            window.location.reload()
        })
        .catch( (error) => {
            this.setState({ message : error.response.data })
        })
        this.context.togglePreloader()   
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
                    <div className="content flex flex-column middle center">
                        {this.state.message && (
                            <FormMessage type="fail" text={this.state.message}/>
                        )}
                        <div className="profile-picture-wrapper large">
                            {this.state.user.profile ? (
                                <img alt="" src={process.env.PUBLIC_URL + 'profile/BU-1.png'} />
                            ) : (
                                <i className="material-icons large">person</i>
                            )}
                            
                        </div>
                        <br/>
                        <div>{this.state.user.name}</div>
                        <div>@{this.state.user.username}</div>
                        <div className="col s10 m8 l4">
                            <Button onClick={this.logout} label="Log out"/>
                            <Button onClick={this.logout} label="Edit personal data"/>
                            <Button onClick={this.logout} label="Change password"/>
                            <Button onClick={this.delete} label="Delete Account"/>
                        </div>
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