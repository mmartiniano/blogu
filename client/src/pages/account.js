import React from 'react'
import '../stylesheets/lune.css'
import FormMessage from '../components/form/form_message'
import Button from '../components/form/button'
import IconMessage from '../components/general/icon_message'
import Modal from '../components/general/modal'

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
            editing: false,
            changingPassword: false,
            deleting: false,
            user: undefined
        }
    }

    toggleEditing = () => {
        this.setState({ editing: !this.state.editing, message: '' })
    }

    showChangePassword = () => {
        this.setState({ changingPassword: true })
    }

    handleCancelChangePassword = () => {
        this.setState({ changingPassword: false })
    }

    handleOKChangePassword = () => {
        this.setState({ changingPassword: false })
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
            this.setState({ message: error.response ? error.response.data : 'Failed to connect' })
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
                    <React.Fragment>
                        <div className="content flex flex-column middle center">
                            {this.state.message && (
                                <FormMessage type="fail" text={this.state.message}/>
                            )}
                            <div className="profile-picture-wrapper large">
                                {this.state.user.profile ? (
                                    <img alt="" src={process.env.PUBLIC_URL + 'profile/BU-1.png'} />
                                ) : (
                                    <i className="material-icons">account_circle</i>
                                )}
                            </div>
                            <div>{this.state.user.name}</div>
                            <div>@{this.state.user.username}</div>
                            <div className="col s10 m8 l4">
                                <Button onClick={this.logout} label="Log out"/>
                                <Button onClick={this.logout} label="Edit personal data"/>
                                <Button onClick={this.showChangePassword} label="Change password"/>
                                <Button onClick={this.delete} label="Delete Account"/>
                            </div>
                        </div>
                        <Modal style={{height: '40vh', width: '80%'}} visible={this.state.changingPassword} onOK={this.handleOKChangePassword} onCancel={this.handleCancelChangePassword} text="You must reauthenticate in order to proceed"/>
                    </React.Fragment>
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