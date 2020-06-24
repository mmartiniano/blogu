import React from 'react'
import PostList from '../components/post/list'
import IconMessage from '../components/general/icon_message'

import UserService from '../services/user_service'
import { Context } from '../context'

/*
* Blogu Blog page
*
* Display a blog page (owner info and its posts)
*
*/

class Blog extends React.Component {

    static contextType = Context

    constructor(props) {
        super(props)

        this.state = {
            user: undefined,
            posts: [],
            iconMessage: {
                icon: undefined,
                message: ''
            }
        }
    }

    load = async () => {

        this.context.togglePreloader(true)

        try {

            const { data } = await UserService.getByUsername(this.props.match.params.username)
            this.setState({ user: data })

        } catch (error) {

            if (error.response.status && (error.response.status !== 404))
                this.setState({ 
                    iconMessage: {
                    icon: 'cloud_off',
                    message: 'Could not get user'
                    }
                })

            else
                this.setState({
                    iconMessage: {
                        icon: 'person_search',
                        message: 'Not found'
                    }
                })     
        }

        if (!this.state.user) return

        try {

            const { data } = await UserService.getPosts(this.state.user.id)

            if (data.length > 0)
                this.setState({ posts: data.reverse() })
            else
                this.setState({
                    iconMessage: {
                        message: 'There are no posts'
                    }
                })

        } catch (error) {

            this.setState({
                iconMessage: {
                    icon: 'cloud_off',
                    message: 'Could not get posts'
                }
            }) 
        }

        console.log(this.state.user)
        console.log(this.state.posts)

        this.context.togglePreloader(false)
    }

    componentDidMount() {
        this.load()
    }

    render() {

        return (
            <React.Fragment>
                {this.state.user ? (
                    <PostList history={this.props.history} posts={this.state.posts} />
                ) : (
                    <div className="content flex middle center">
                        {this.state.message && (
                            <IconMessage {...this.state.iconMessage} />
                        )}
                    </div>
                )}
            </React.Fragment>
        )
    }
}


export default Blog