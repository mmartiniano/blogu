import React from 'react'

export default function UserInfo(props) {
    return (
        <div style={props.style && props.style}>
            <div className="mt10 bold">{props.name}</div>
            <div>@{props.username}</div>
        </div>
    )
}

UserInfo.defaultProps = {
    name: '',
    username: ''
}