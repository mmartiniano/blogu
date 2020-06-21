import React from 'react'

export default function TimeToRead(props) {

    const WPM = 130

    const text = props.text ? props.text : ''

    let time = text.split(' ').length / WPM

    if (time > 60) {
        const hours = time / 60
        const minutes = time % 60

        time = `${Math.floor(hours)}h ${Math.round(minutes)} min read`
    } else if (time < 1) {
        time = `1 min read`
    }
    else {
        time = `${Math.round(time)} min read`
    }

    return (
        <div style={props.style && props.style}>{time}</div>
    )
}