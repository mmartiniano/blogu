import React from 'react'

export default function Actions(props) {

    const handleClick = (event, callback) => {
        event.stopPropagation()

        if (typeof callback === 'function')
            callback()
    }

    return (
        <div className="post-actions">
            <i title="Share" onClick={ event => { handleClick(event, props.share) }} className="material-icons">share</i>
            {props.isAuthor && (
                <React.Fragment>
                    <i title="Edit" onClick={ event => { handleClick(event, props.edit) }} className="material-icons">edit</i>
                    <i title="Delete" onClick={ event => { handleClick(event, props.delete) }} className="material-icons">delete</i>
                </React.Fragment>
            )}    
        </div>
    )
}