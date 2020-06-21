import React from 'react'
import PostComponent from '../components/post'
import IconMessage from '../components/general/icon_message'

import PostService from '../services/post_service'
import { Context } from '../context'

/*
* Blogu Post
*
* Display a single posts
*
*/

class Post extends React.Component {

    static contextType = Context

    constructor(props) {
        super(props)

        this.state = {
            post: undefined,
            message: ''
        }
    }

    load = () => {
        this.context.togglePreloader()

        PostService.get(this.props.match.params.id)
        .then( response => {
            this.setState({
                post: response.data
            })
        })
        .catch( error => {
            this.setState({
                message: 'Could not get post'
            })
        })
        .then( this.context.togglePreloader )
    }

    handleDeletePost = index => {
        this.context.togglePreloader()
        this.props.history.push('/')
    }

    componentDidMount() {
        this.load()
    }

    render() {

        return (
            <React.Fragment>
                {this.state.post ? (
                    <div className="content flex flex-column middle">
                        <PostComponent post={this.state.post} onDelete={this.handleDeletePost}/>
                    </div>
                ) : (
                    <div className="content flex middle center">
                        {this.state.message && (
                            <IconMessage icon="description" message={this.state.message}/>
                        )}
                    </div>
                )}
            </React.Fragment>
        )
    }
}


export default Post