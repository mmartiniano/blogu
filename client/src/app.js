import React from 'react'
import './stylesheets/lune.css'
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
            togglePreloader: this.togglePreloader
        }
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                <div className="app">
                    {this.state.preloader && (
                        <Preloader/>
                    )}
                    <Home/>
                </div>
            </Context.Provider>
        )
    }
}
