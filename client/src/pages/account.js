import React from 'react'
import '../stylesheets/lune.css'
import FormMessage from '../components/form/form_message'
import ProfilePicturePicker from '../components/general/profile_picture_picker'
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

    constructor(props) {
        super(props)

        this.state = {
            message: '',
            editing: false,
            pickingProfilePicture: false,
            changingPassword: false,
            deleting: false,
            user: undefined
        }
    }

    toggleEditing = () => {
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

        this.props.history.push("/")
        window.location.reload()             
    }

    update = data => {

        this.context.togglePreloader()

        UserService.update(data)
        .then( response => {
            window.location.reload()
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
            window.location.reload()
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
            this.context.resetUser()
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
                                    <div className="profile-picture-wrapper large profile-picture-picker" onClick={this.showProfilePicturePicker}>
                                        {(this.state.user && this.state.user.avatar) ? (
                                            <img className="profile-picture" alt="" src={process.env.PUBLIC_URL + 'profile/' + this.state.user.avatar}/>
                                        ) : (
                                            <i className="profile-picture material-icons primary-text">person</i>
                                        )}
                                    </div>
                                    <ProfilePicturePicker visible={this.state.pickingProfilePicture} onPick={this.handlePick} onCancel={this.handleCancelPick}/>
                                    <div className="mt10">{this.state.user.name}</div>
                                    <div>@{this.state.user.username}</div>
                                    <div className="col s10 m8 l4 mt20">
                                        <Button onClick={this.logout} label="Log out"/>
                                        <Button onClick={this.toggleEditing} label="Edit personal data"/>
                                        <Button onClick={this.toggleChangingPassword} label="Change password"/>
                                        <Button onClick={this.showDelete} label="Delete Account"/>
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