import React from 'react'
import UserInfo from '../user/user_info'
import PostDate from './date'
import TimeToRead from './time_to_read'

export default function Info(props) {

    const fontSize = {
        fontSize: '12px'
    }

    return (
        <div>
            <UserInfo style={fontSize} name={props.author.name} username={props.author.username}/>
            <div className="flex">
                <PostDate style={fontSize} value={props.created_at}/>
                <span style={fontSize} className="middledot">&middot;</span>
                <TimeToRead style={fontSize} text={props.text}/>
            </div>
        </div>
    )
}