import React, { useState } from 'react'
import Input from './input'
import TextArea from './textarea'
import Button from './button'
import '../../stylesheets/lune.css'

const PostForm = props => {

    const [data, setData] = useState({ title: '', text: '' })

    const submit = event => {
        event.preventDefault()

        if (! props.onSubmit)
            return

        if (props.post)
            return props.onSubmit({ ...props.post, ...data})
        
        props.onSubmit(data)
    }

    const update = event => {
        const {name, value} = event.target

        setData({ ...data, [name]: value})
    }

    return (
        <form>
            <Input name="title" label="Title" onChange={update}/>
            <TextArea name="text" label="Content" onChange={update}/>
            <Button type="submit" label={props.post ? 'Save' : 'Publish'} onClick={submit}/>
        </form>
    )

}

export default PostForm