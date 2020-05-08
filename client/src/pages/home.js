import React from 'react'
import '../stylesheets/lune.css'
import Logo from '../components/general/logo'
import LoginForm from '../components/form/login_form'
import SignupForm from '../components/form/signup_form'
import DividerText from '../components/general/divider_text'
import Button from '../components/form/button'

/*
* Blogu Homepage
*
* Contains 2 forms: login and signup
* and a switch to show/hide 'em
*
*/

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            forms: [<LoginForm/>, <SignupForm/>],
            button: ["Sign up", "Log in"],
            switch: 0
        }
    }

    shift = () => {
        this.setState({ switch: this.state.switch ^ 1 })
    }

    render() {

        return (
            <div className="full-screen flex middle center">
                <div className="container col l4 m6 row center single-content flex middle">
                    <div className="col s12">
                        <Logo/>
                        {this.state.forms[this.state.switch]}
                        <DividerText text="or" classes="bold secondary"/>
                        <Button label={this.state.button[this.state.switch]} onClick={this.shift}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home