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


        this.state = {
            value: this.props.value ? this.props.value : ''
        }

        this.resize = this.resize.bind(this)
    }

    componentDidMount() {
        this.textarea.current.addEventListener('input', this.resize)
        window.addEventListener('resize', this.resize)
        this.resize()
    }

    componentWillUnmount() {
        this.textarea.current.removeEventListener('input', this.resize)
        window.removeEventListener('resize', this.resize)
    }

    resize = () => {
        this.textarea.current.style.height = 'auto'
        this.textarea.current.style.height = this.textarea.current.scrollHeight + 'px'
    }

    changeHandler = event => {
        this.setState({
            value: event.target.value
        })

        if (! this.props.onChange)
            return
        
        this.props.onChange(event)
    }

    render () {
        return (
            <div className={this.design}>
                <textarea 
                    ref={this.textarea}
                    name={this.props.name}
                    placeholder={this.props.label}
                    required={this.props.required}
                    onChange={this.changeHandler}
                    value={this.state.value}
                />
            </div>
        )
    }

}