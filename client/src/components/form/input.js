import React from 'react'
import '../../stylesheets/lune.css'

/* 
* Input component
*
* props
*   - type: set input value type
*       values: text | password | email
*       default: text
*   
*   - name: set value name
*
*   - label: set label value
*
*   - design
*       values: underline | box
*       default: underline
*
*   - required: not null flag
*       values: false | true
*       default: false
*
*   - onChange
*       values: callback function that accepts onChange event
*
*   TO DO: validation
*/

export default class Input extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value ? this.props.value : ''
        }
    }

    changeHandler = event => {
        this.setState({
            value: event.target.value
        })

        if (! this.props.onChange)
            return
        
        this.props.onChange(event)
    }

    render() {
        return (
            <div className={this.props.design === "box" ? "input-box" : "input-field"}>
                <input 
                    name={this.props.name}
                    placeholder={this.props.label}
                    type={this.props.type}
                    required={this.props.required}
                    onChange={this.changeHandler}
                    value={this.state.value}
                />
            </div>
        )
    }
    
}