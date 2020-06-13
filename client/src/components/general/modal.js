import React from 'react'
import Button from '../form/button'

export default class Modal extends React.Component {
    
    static defaultProps = {
        visible: false,
        type: 'readonly',
        cancelText: 'Cancel',
        okText: 'OK',
        onCancel: () => {},
        onOK: () => {},
    }

    constructor(props) {
        super(props)

        this.wrapper = React.createRef()
        this.modal = React.createRef()
    }

    dismiss = () => {
        this.wrapper.current.style.animation = 'hide-modal-wrapper 0.2s'
        this.modal.current.style.animation = 'hide-modal 0.2s'
    }

    handleOK = () => {
        this.dismiss()
        setTimeout(this.props.onOK, 200)
    }

    handleCancel = () => {
        this.dismiss()
        setTimeout(this.props.onCancel, 200)      
    }

    handleUnfocus = event => {
        if (event.target !== this.wrapper.current)
            return

        this.handleCancel()
    }

    render() {
        return (
            <React.Fragment>
                {this.props.visible && (
                    <div ref={this.wrapper} className="modal-wrapper" onClick={this.handleUnfocus}>
                        <div ref={this.modal} style={this.props.style} className="modal col s10 m8 l6">
                            <div className="modal-content">
                                {this.props.children}
                            </div>
                            <div className="modal-actions">
                                <div className="col s5">
                                    <Button label={this.props.cancelText} onClick={this.handleCancel}/>
                                </div>
                                <div className="col s5">
                                    <Button label={this.props.okText} onClick={this.handleOK}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }

}