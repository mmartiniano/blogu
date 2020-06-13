import React, { useState } from 'react'
import Input from './input'
import Button from './button'
import DividerText from '../general/divider_text'
import '../../stylesheets/lune.css'

const PersonalDataForm = props => {

    const [data, setData] = useState({ name: '', username: '', avatar: '', ...props.user })

    const submit = event => {
        event.preventDefault()

        if (! props.onSubmit) return

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
            <Input value={data.name} name="name" label="Name" onChange={update}/>
            <Input value={data.username} name="username" label="Username" onChange={update}/>
            <Button type="submit" label="Save changes" onClick={submit}/>
            <DividerText text="or" classes="bold primary"/>
            <Button label="Cancel" onClick={cancel}/>
        </form>
    )

}

export default PersonalDataForm