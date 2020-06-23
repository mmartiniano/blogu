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
            message: '',
            iconMessage: 'description'
        }
    }

    load = () => {
        this.context.togglePreloader(true)

        PostService.get(this.props.match.params.id)
        .then( response => {
            this.context.togglePreloader(false)
            this.setState({ post: response.data })
        })
        .catch( error => {
            this.context.togglePreloader(false)
            if (error.response.status && (error.response.status !== 404))
               return this.setState({ message: 'Could not get post' })

            this.setState({
                message: 'Not found',
                iconMessage: 'search_off'
            })
        })
    }

    handleDeletePost = () => {
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
                        <PostComponent {...this.state.post} onDelete={this.handleDeletePost}/>
                    </div>
                ) : (
                    <div className="content flex middle center">
                        {this.state.message && (
                            <IconMessage icon={this.state.iconMessage} message={this.state.message}/>
                        )}
                    </div>
                )}
            </React.Fragment>
        )
    }
}


export default Post