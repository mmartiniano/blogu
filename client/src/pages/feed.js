import React from 'react'
import '../stylesheets/lune.css'
import PostList from '../components/post/list'
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

    componentDidMount() {
        this.load()
    }

    render() {

        return (
            <React.Fragment>
                {this.state.posts ? (
                    <div className="content flex flex-column middle">
                        <PostList history={this.props.history} posts={this.state.posts} />
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