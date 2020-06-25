import React from 'react'
import '../stylesheets/lune.css'
import FormMessage from '../components/form/form_message'
import ProfilePicture from '../components/user/profile_picture'
import ProfilePicturePicker from '../components/user/profile_picture_picker'
import UserInfo from '../components/user/user_info'
import PersonalDataForm from '../components/form/personal_data_form'
import PasswordForm from '../components/form/password_form'
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

    constructor(props, context) {
        super(props)

        this.state = {
            message: '',
            editing: false,
            pickingProfilePicture: false,
            changingPassword: false,
            deleting: false,
            user: context.user
        }
    }

    toggleEditing = value => {
        if (value != null)
            this.setState({ editing: value, message: '' })
        else
            this.setState({ editing: !this.state.editing, message: '' })   
    }

    toggleChangingPassword = () => {
        this.toggleEditing()
        this.setState({ changingPassword: !this.state.changingPassword })
    }

    showProfilePicturePicker = () => {
        this.setState({ pickingProfilePicture: true })
    }

    handlePick = picture => {
        const user = this.state.user
        user.avatar = picture
        this.setState({ pickingProfilePicture: false })
        this.update(user)
    }

    handleCancelPick = () => {
        this.setState({ pickingProfilePicture: false })
    }

    showDelete = () => {
        this.setState({ deleting: true })
    }

    handleCancelDelete = () => {
        this.setState({ deleting: false })
    }

    handleOKDelete = () => {
        this.setState({ deleting: false })
        this.delete()
    }
    
    logout = () => {
        this.context.togglePreloader()

        AuthService.logout()

        this.context.resetUser()

        this.context.togglePreloader()

        if (this.props.history)
            this.props.history.push("/")           
    }

    update = data => {

        this.context.togglePreloader()

        UserService.update(data)
        .then( response => {
            this.context.resetUser()
            this.setState({
                user: this.context.user
            })
            this.toggleEditing(false)
        })
        .catch( error => {
            this.setState({ message: error.response ? error.response.data : 'Failed to connect' })
        })
        .then( this.context.togglePreloader )
    }

    updatePassword = data => {

        this.context.togglePreloader()

        UserService.updatePassword(data)
        .then( response => {
            this.context.resetUser()
            this.toggleChangingPassword()
        })
        .catch( error => {
            this.setState({ message: error.response ? error.response.data : 'Failed to connect' })
        })
        .then( this.context.togglePreloader )
    }

    delete = () => {
        this.context.togglePreloader()

        UserService.delete()

        .then( () => {
            AuthService.logout()
                
            if (this.props.history)this.context.togglePreloader()
                this.props.history.push("/")
            this.context.resetUser()
        })
        .catch( (error) => {
            this.setState({ message: error.response ? error.response.data : 'Failed to connect' })
        })
        this.context.togglePreloader()   
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
                            {this.state.editing ? (
                                <div className="col s10 m8 l4">
                                    {this.state.changingPassword ? (
                                        <PasswordForm onSubmit={this.updatePassword} onCancel={this.toggleChangingPassword}/>
                                    ) : (
                                        <PersonalDataForm user={this.state.user} onSubmit={this.update} onCancel={this.toggleEditing}/>
                                    )}
                                </div>
                            ) : (
                                <React.Fragment>
                                    <ProfilePicture size="large" picture={this.state.user.avatar} onClick={this.showProfilePicturePicker}/>
                                    <ProfilePicturePicker visible={this.state.pickingProfilePicture} onPick={this.handlePick} onCancel={this.handleCancelPick}/>
                                    <UserInfo style={{textAlign: 'center'}} name={this.state.user.name} username={this.state.user.username}/>
                                    <div className="col s10 m8 l4 mt20">
                                        <Button onClick={this.logout} label="Log out"/>
                                        <Button onClick={this.toggleEditing} label="Edit personal data"/>
                                        <Button onClick={this.toggleChangingPassword} label="Change password"/>
                                        <Button level="danger" onClick={this.showDelete} label="Delete Account"/>
                                    </div>
                                    <Modal style={{height: '170px', textAlign: 'center'}} visible={this.state.deleting} onOK={this.handleOKDelete} onCancel={this.handleCancelDelete}>
                                        Are you sure you want to delete your Blogu account?
                                    </Modal>
                                </React.Fragment>
                            )}
                        </div>
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