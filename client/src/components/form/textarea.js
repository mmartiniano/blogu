import React from 'react'
import '../../stylesheets/lune.css'

/* 
* TextArea component
*
* props
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
*       values: callback function that accepts 1 value (input current value)
*
*   TO DO: validation
*/

export default class TextArea extends React.Component {

    constructor(props) {
        super(props)

        this.textarea = React.createRef()
        this.design = this.props.design === "box" ? "input-box" : "input-field"
    }

    componentDidMount() {
        const element = this.textarea.current

        element.addEventListener('input', () => {
            element.style.height = 'auto'
            element.style.height = element.scrollHeight + 'px'
        })
    }

    render () {
        return (
            <div className={this.design}>
                <textarea 
                    ref={this.textarea}
                    name={this.props.name}
                    placeholder={this.props.label}
                    required={this.props.required}
                    onChange={this.props.onChange}
                />
            </div>
        )
    }

}