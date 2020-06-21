import React from 'react'

export default function ProfilePicture(props) {
    return (
        <div className={`profile-picture-wrapper profile-picture-picker ${props.size} ${props.pointer && 'pointer'}`} onClick={props.onClick}>
            {props.picture ? (
                <img className="profile-picture" alt="" src={process.env.PUBLIC_URL + 'profile/' + props.picture}/>
            ) : (
                <i className="profile-picture material-icons primary-text">person</i>
            )}
        </div>
    )
}

ProfilePicture.defaultProps = {
    picture: undefined,
    size: '',
    pointer: true,
    onClick: () => {}
}