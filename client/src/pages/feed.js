import React from 'react'
import '../stylesheets/lune.css'
import Post from '../components/post'
import IconMessage from '../components/general/icon_message'

import PostService from '../services/post_service'
import { Context } from '../context'

/*
* Blogu Feed
*
* Displays all posts
*
*/

class Feed extends React.Component {

    static contextType = Context

    constructor(props) {
        super(props)

        this.state = {
            posts: undefined,
            message: ''
        }
    }

    load = () => {
        this.context.togglePreloader(true)

        PostService.list()
        .then( response => {
            this.context.togglePreloader(false)
            if (response.data.length > 0)
                this.setState({
                    posts: response.data.reverse()
                })
            else
                this.setState({
                    message: 'There are no posts'
                })
        })
        .catch( error => {
            this.context.togglePreloader(false)
            this.setState({
                message: 'Could not get posts'
            })
        })
    }

    handleDeletePost = index => {
        const postList = [...this.state.posts]
        postList.splice(index, 1)

        this.setState({
            posts: postList
        })
    }

    componentDidMount() {
        this.load()
    }

    render() {

        return (
            <React.Fragment>
                {this.state.posts ? (
                    <div className="content flex flex-column middle">
                        {this.state.posts.map( (post) => {
                            return <Post type="card" history={this.props.history} key={post._id} onDelete={this.handleDeletePost} {...post}/>
                        })}
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


export default Feed