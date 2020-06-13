import React, { useState } from 'react'
import Input from './input'
import Button from './button'
import DividerText from '../general/divider_text'
import '../../stylesheets/lune.css'

const PasswordForm = props => {

    const [data, setData] = useState({ oldPassword: '', newPassword: '' })

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
            <Input type="password" name="oldPassword" label="Old Password" onChange={update}/>
            <Input type="password" name="newPassword" label="New Password" onChange={update}/>
            <Button type="submit" label="Save" onClick={submit}/>
            <DividerText text="or" classes="bold primary"/>
            <Button label="Cancel" onClick={cancel}/>
        </form>
    )

}

export default PasswordForm