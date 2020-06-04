import React from 'react'
import '../../stylesheets/lune.css'

/* 
* Toast
*
* Display a toast at bottom page
*
* props
*   - text
*   - duration in miliseconds
*   
*/

export default class Toast extends React.Component {

    static SHORT = 1500
    static MEDIUM = 2000
    static LONG = 2500

    constructor(props) {
        super(props)

        this.toast = React.createRef()
        this.duration = this.props.duration || Toast.MEDIUM

        this.state = {
            display: true
        }
    }

    componentDidMount() {
        const toast = this.toast.current

        toast.style.animation =  `toastit ${this.duration / 1000}s`

        setTimeout( () => {
           this.setState({
               display: false
           })
        }, this.duration)

    }

    render() {
        return (
            <React.Fragment>
                {this.state.display && (
                    <div ref={this.toast} className="toast round black">
                        {this.props.text}
                    </div>
                )}
            </React.Fragment>
        )
    }
    
}