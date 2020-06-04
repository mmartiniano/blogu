import React from 'react'
import '../stylesheets/lune.css'
import FormMessage from '../components/form/form_message'
import PostForm from '../components/form/post_form'
import PostService from '../services/post_service'
import { Context } from '../context'

/*
* Blogu Publishing Post
*
* Create / Edit post
*
*/

class Publish extends React.Component {

    static contextType = Context

    constructor(props) {
        super(props)

        this.state = {
            message: '',
        }
    }

    create = post => {
        this.context.togglePreloader()

        PostService.create(post)
        .then( response => {
            this.context.togglePublish()
        })
        .catch( error => {
            this.setState({ message: error.response.data })
        })

        this.context.togglePreloader()
    }

    edit = post => {
        this.context.togglePreloader()

        PostService.update(post)
        .then( response => {
            this.context.togglePublish()
        })
        .catch( error => {
            this.setState({ message: error.response.data })
        })

        this.context.togglePreloader()
    }

    render() {

        return (
            <div className="content flex center">
                <div className="col s10 m8 l6">
                    {this.state.message && (
                        <FormMessage type="fail" text={this.state.message}/>
                    )}
                    <PostForm post={this.props.post} onSubmit={this.props.post ? this.edit : this.create} />
                    <br/>
                </div>
            </div>
            
        )
    }
}


export default Publish