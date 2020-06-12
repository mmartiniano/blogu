import React from 'react'

export default class Modal extends React.Component {
    
    static defaultProps = {
        visible: false,
        text: '',
        type: 'readonly',
        cancelText: 'Cancel',
        okText: 'OK',
        onCancel: () => {},
        onOk: () => {},
    }

    constructor(props) {
        super(props)

        this.wrapper = React.createRef()
        this.modal = React.createRef()
    }

    dismiss = event => {
        if (event.target === this.modal.current)
            return

        this.wrapper.current.style.animation = 'hide-modal-wrapper 0.2s'
        this.modal.current.style.animation = 'hide-modal 0.2s'

        setTimeout( () => {
            this.props.onCancel()
        }, 200)
    }

    render() {
        return (
            <React.Fragment>
                {this.props.visible && (
                    <div ref={this.wrapper} className="modal-wrapper" onClick={this.dismiss}>
                        <div ref={this.modal} className="modal">
                            <div>{this.props.text}</div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }

}