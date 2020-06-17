import React from 'react'
import Modal from './modal'

const PROFILE_PICTURES = [
    'BU-1.png',
    'BU-2.png'
]

export default class ProfilePicturePicker extends React.Component {

    static defaultProps = {
        visible: false,
        onCancel: () => {},
        onPick: () => {}
    }
    
    constructor(props) {
        super(props)

        this.state = {
            selected: null,
            picture: null
        }
    }

    select = (event, picture) => {
        if (this.state.selected && this.state.selected.classList) {
            this.state.selected.classList.remove('selected')
        }
        event.currentTarget.classList.add('selected')
        this.setState({
            selected: event.currentTarget,
            picture: picture
        })
    }

    render() {
        return (
            <Modal visible={this.props.visible} onOK={() => { this.props.onPick(this.state.picture) }} onCancel={this.props.onCancel}>
                <div className="profile-picture-picker-list">
                    <div className="profile-picture-wrapper profile-picture-picker-item primary-text" onClick={event => this.select(event, null)}>
                        <i className="profile-picture material-icons">clear</i>
                    </div>
                    {PROFILE_PICTURES.map( (picture, i) => {
                        return (
                            <div className="profile-picture-wrapper profile-picture-picker-item" onClick={event => this.select(event, picture)}>
                                <img className="profile-picture" key={i} alt="" src={process.env.PUBLIC_URL + 'profile/' + picture}/>
                            </div>
                        )
                    })}
                </div>
            </Modal>
        )
    }

}