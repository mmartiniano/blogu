import React from 'react'
import { Switch, Route } from "react-router-dom"

import AuthService from './services/auth_service'

import './stylesheets/lune.css'

import Navbar from './components/navigation/blogu_navbar'
import Home from './pages/home'
import Publish from './pages/publish'
import Feed from './pages/feed'
import Account from './pages/account'
import Preloader from './components/general/preloader'
import { Context } from './context'

export default class App extends React.Component {

    static contextType = Context;

    constructor(props, context) {
        super(props)
        this.context = context

        this.togglePreloader = () => {     
            this.setState({
                preloader: !this.state.preloader
            })
        }

        this.toggleAuth = () => {
            this.setState({
                user: AuthService.user()
            })
        }

        this.setPublishing = (value) => {
            this.setState({
                publishing: value
            })
        }

        this.state = {
            ...this.context,
            togglePreloader: this.togglePreloader,
            toggleAuth: this.toggleAuth,
            setPublishing: this.setPublishing
        }
        
    }

    componentDidMount() {
        const user = AuthService.user()

        if(user)
            this.setState({ user: user })    
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                <div className="app">
                    {this.state.preloader && (
                        <Preloader/>
                    )}
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
                                <Route path='/account' component={Account}/>
                            </Switch>
                        </React.Fragment>
                    )} 
                </div>
            </Context.Provider>
        )
    }
}