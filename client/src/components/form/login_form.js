import React, { useState } from 'react'
import Input from './input'
import Button from './button'
import '../../stylesheets/lune.css'

const LoginForm = props => {

    const [credentials, setCredencials] = useState({ username: '', password: '' })

    const submit = event => {
        event.preventDefault()

        if (! props.onSubmit) return

        props.onSubmit(credentials)
    }

    const update = event => {
        const {name, value} = event.target

        setCredencials({ ...credentials, [name]: value})
    }

    return (
        <form>
            <Input name="username" label="Username" onChange={update}/>
            <Input name="password" label="Password" type="password" onChange={update}/>
            <Button type="submit" label="Log in" onClick={submit}/>
        </form>
    )

}

export default LoginForm