import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AuthService from './services/auth_service'

import './stylesheets/lune.css'

import Navbar from './components/navigation/navbar'
import Home from './pages/home'
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

        this.state = {
            preloader: this.context.preloader,
            togglePreloader: this.togglePreloader,
            user: undefined
        }
    }

    logout = () => {
        this.context.togglePreloader()

        AuthService.logout()

        this.setState({ user: undefined })

        this.context.togglePreloader()

    }

    componentDidMount() {
        const user = AuthService.user()

        if(user)
            this.setState({ user: user })
    }

    render() {
        return (
            <Router>
                <Context.Provider value={this.state}>
                    <div className="app">
                        {this.state.preloader && (
                            <Preloader/>
                        )}
                        {!this.state.user ? (
                            <Home/>
                        ) : (
                            <Navbar main="Blogu" mainLink="/" fixed={true} hover={true} ulPosition="right">
                                <Link to="/"><li title="Feed"><i className="material-icons">trip_origin</i></li></Link>
                                <Link to="/"><li title="Blog"><i className="material-icons">library_books</i></li></Link>
                                <Link to="/"><li title="Account"><i className="material-icons">person</i></li></Link>
                                <Link to="/"><li onClick={this.logout} title="Log out"><i className="material-icons">exit_to_app</i></li></Link>
                            </Navbar>
                        )} 
                    </div>
                </Context.Provider>
            </Router>
        )
    }
}
