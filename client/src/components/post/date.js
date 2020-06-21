import React from 'react'

export default function PostDate(props) {
    let date 

    try {
        let string = new Date(props.value).toString()
        const [, month, day, year] = string.split(" ")

        date = `${month} ${day}, ${year}`
    } catch (error) {
        date = ''
    }

    return (
        <div style={props.style}>{date}</div>
    )
}