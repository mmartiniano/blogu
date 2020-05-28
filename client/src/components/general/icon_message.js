import React from 'react'

export default function IconMessage(props) {
    return (
        <div className="icon-message">
            {props.icon && (
                <i className="material-icons">{props.icon}</i>
            )}
            {props.message && (
                <div>{props.message}</div>
            )}
        </div>
    )
}