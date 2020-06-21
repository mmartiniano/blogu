import React from 'react'
import '../../stylesheets/lune.css'

/* 
* Toast
*
* Display a toast
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

    static defaultProps = {
        visible: false,
        duration: Toast.MEDIUM,
        text: '',
        onFadeIn: () => {},
        onFadeOut: () => {}
    }

    constructor(props) {
        super(props)

        this.style = {
            animation: `toastit ${this.props.duration / 1000}s`
        }
    }

    onFadeIn = () => {
        this.props.onFadeIn()
        setTimeout( () => {
           this.props.onFadeOut()
        }, this.props.duration)
    }

    render() {
        return (
            <React.Fragment>
                {this.props.visible && (
                    <div style={this.style} className="toast round black">
                        {this.onFadeIn()}
                        {this.props.text}
                    </div>
                )}
            </React.Fragment>
        )
    }
    
}