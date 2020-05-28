import React from 'react'
import '../../stylesheets/lune.css'

import { Link } from 'react-router-dom'

/* 
* Navbar component
*
* props
*   - position: set navbar position
*       values: sticky | fixed | relative | absolute
*       default: sticky
*   
*   - logo: Logo name
*
*   - logoLink: Logo link
*
*   - mainAction: Main action component
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

        const mobile = this.state.width < this.mobileThreshold

        return (
            <React.Fragment>
                {!mobile ? (
                    <nav className={`navbar bold ${this.props.position || 'sticky'} ${this.props.align || ''}`}>
                        <Link to={this.props.logoLink}>{this.props.logo}</Link>
                        <ul className={`${this.props.ulPosition} ${this.props.hover? 'hover' : ''}`}>
                            {this.props.children}
                            {this.props.mainAction}
                        </ul>
                    </nav>

                ) : (
                    <React.Fragment>
                        <header className={`navbar sticky bold ${this.props.align || ''}`}>
                            <Link to={this.props.logoLink} className="center">{this.props.logo}</Link>
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