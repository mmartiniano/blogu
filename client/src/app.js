import React from 'react'
import { Switch, Route } from "react-router-dom"

import AuthService from './services/auth_service'

import './stylesheets/lune.css'

import Navbar from './components/navigation/blogu_navbar'
import Home from './pages/home'
import Publish from './pages/publish'
import Feed from './pages/feed'
import Account from './pages/account'
import Post from './pages/post'
import Preloader from './components/general/preloader'
import Toast from './components/general/toast'
import { Context } from './context'

export default class App extends React.Component {

    static contextType = Context;

    constructor(props, context) {
        super(props)
        this.context = context

        this.togglePreloader = setTo => {
            if (setTo != null)
                this.setState({ preloader: setTo })
            else
                this.setState({ preloader: !this.state.preloader })
        }

        this.resetUser = () => {
            this.setState({
                user: AuthService.user()
            })
        }

        this.setPublishing = (value) => {
            this.setState({
                publishing: value
            })
        }

        this.toastIt = (text) => {
            this.setState({
                toast: true,
                toastMessage: text
            })
        }

        this.handleToastFadeOut = () => {
            this.setState({
                toast: false,
                toastMessage: ''
            })
        }

        this.state = {
            ...this.context,
            user: AuthService.user(),
            togglePreloader: this.togglePreloader,
            resetUser: this.resetUser,
            setPublishing: this.setPublishing,
            toastIt: this.toastIt
        }
        
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                <div className="app">
                    {this.state.preloader && (
                        <Preloader/>
                    )}
                    <Toast visible={this.state.toast} text={this.state.toastMessage} onFadeOut={this.handleToastFadeOut}/>
                    {!this.state.user ? (
                        <Home/>
                    ) : (
                        <React.Fragment>
                            <Navbar/>
                            <Switch>
                                {this.state.publishing ? (
                                    <Route exact path='/' component={Publish}/>
                                ) : (
                                    <Route exact path='/' component={Feed}/>
                                )}
                                <Route path='/post/:id' component={Post}/>
                                <Route path='/account' component={Account}/>
                            </Switch>
                        </React.Fragment>
                    )} 
                </div>
            </Context.Provider>
        )
    }
}