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
            this.context.togglePreloader()
            this.context.toastIt('Published')
            this.context.setPublishing(false)
        })
        .catch( error => {
            this.context.togglePreloader()
            this.setState({ message: error.response.data })
        })     
    }

    edit = post => {
        this.context.togglePreloader()

        PostService.update(post)
        .then( response => {
            this.context.togglePreloader()
            this.context.toastIt('Updated')
            this.context.setPost(undefined)
            this.context.setPublishing(false)
        })
        .catch( error => {
            this.context.togglePreloader()
            this.setState({ message: error.response ? error.response.data : 'Failed to connect' })
        })  
    }

    cancel = () => {
        this.context.setPost(undefined)
        this.context.setPublishing(false)
    }

    render() {
        return (
            <div className="content flex center">
                <div className="col s10 m8 l5">
                    {this.state.message && (
                        <FormMessage type="fail" text={this.state.message}/>
                    )}
                    <PostForm post={this.context.post} onSubmit={this.context.post ? this.edit : this.create} onCancel={this.cancel}/>
                    <br/>
                </div>
            </div> 
        )
    }
}


export default Publish