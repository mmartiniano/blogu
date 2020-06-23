import React, { useState } from 'react'
import Input from './input'
import TextArea from './textarea'
import Button from './button'
import DividerText from '../general/divider_text'

const PostForm = props => {

    const [data, setData] = useState({ title: '', text: '', ...props.post })

    const submit = event => {
        event.preventDefault()

        if (! props.onSubmit)
            return
        
        props.onSubmit(data)
    }

    const cancel = event => {
        event.preventDefault()

        if (! props.onCancel) return

        props.onCancel()
    }

    const update = event => {
        const {name, value} = event.target

        setData({ ...data, [name]: value})
    }

    return (
        <form>
            <Input value={data.title} name="title" label="Title" onChange={update}/>
            <TextArea value={data.text} name="text" label="Content" onChange={update}/>
            <Button type="submit" label={props.post ? 'Save Changes' : 'Publish'} onClick={submit}/>
            <DividerText text="or" classes="bold primary"/>
            <Button label="Cancel" onClick={cancel}/>
        </form>
    )

}

export default PostForm