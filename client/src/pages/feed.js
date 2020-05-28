import React from 'react'
import '../stylesheets/lune.css'
import Card from '../components/general/card'
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
        PostService.list()
        .then( response => {
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
                        {this.state.posts.map( (post, i) => {
                            return (
                                <Card key={i} round={true} color="secondary">
                                    <div>{post.title}</div>
                                </Card>
                            )
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