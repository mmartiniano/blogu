import React from 'react'
import '../../stylesheets/lune.css'

import { Link } from 'react-router-dom'

/* 
* Navbar component
*
* props
*   - fixed: turn navbar position to fixed
*       values: true | false
*       default: false
*   
*   - main: Logo name
*
*   - mainLink: Logo link
*
*   - align
*       values: left | center | right
*
*   - ulPosition:
*       values: left | center | right
*
*   - hover
*       values: true | false
*/

export default class Navbar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        }

        this.mobileThreshold = this.props.mobileThreshold || 768

        this.handleResize = this.handleResize.bind(this)

    }

    handleResize() {
        this.setState({
            width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    render() {

        const mobile = this.state.width >= this.mobileThreshold

        return (
            <React.Fragment>
                {mobile ? (
                    <nav className={`navbar bold ${this.props.fixed ? 'fixed' : ''} ${this.props.align || ''}`}>
                        <Link to={this.props.mainLink}>{this.props.main}</Link>
                        <ul className={`${this.props.ulPosition} ${this.props.hover? 'hover' : ''}`}>
                            {this.props.children}
                        </ul>
                    </nav>

                ) : (
                    <React.Fragment>
                        <header className={`navbar bold ${this.props.align || ''}`}>
                            <Link to={this.props.mainLink} className="center">{this.props.main}</Link>
                        </header>

                        <nav className={`navbar bold mobile center`}>
                            <ul className={`${this.props.hover? 'hover' : ''}`}>
                                {this.props.children}
                            </ul>
                        </nav>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}