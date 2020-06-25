import React from 'react'
import PostList from '../components/post/list'
import ProfilePicture from '../components/user/profile_picture'
import UserInfo from '../components/user/user_info'
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
            numberOfPosts: undefined,
            iconMessage: {
                icon: undefined,
                message: ''
            }
        }
    }

    load = async () => {

        this.context.togglePreloader(true)

        try {

            const { data } = await UserService.getByUsername(this.props.username)
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

        if (!this.state.user) return this.context.togglePreloader(false)

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

            this.setState({ numberOfPosts : data.length })

        } catch (error) {

            this.setState({
                iconMessage: {
                    icon: 'cloud_off',
                    message: 'Could not get posts'
                }
            }) 
        }

        this.context.togglePreloader(false)
    }

    handleDeletePost = postListLength => {
        this.setState({ numberOfPosts: postListLength })
        if (postListLength <= 0)
            this.setState({
                iconMessage: {
                    message: 'There are no posts'
                }
            })
    }

    componentDidMount() {
        this.load()
    }

    componentDidUpdate(previousProps) {
        if (this.props.username !== previousProps.username)
            this.load()                
    }

    render() {

        return (
            <React.Fragment>
                {this.state.user ? (
                    <div className="content flex flex-column middle">
                        <ProfilePicture picture={this.state.user.avatar} onClick={this.showProfilePicturePicker}/>
                        <UserInfo style={{textAlign: 'center', marginBottom: '20px'}} name={this.state.user.name} username={this.state.user.username}/>
                        {this.state.numberOfPosts > 0 ? (
                            <PostList history={this.props.history} posts={this.state.posts} onDeleteItem={this.handleDeletePost}/>
                        ) : (
                            <IconMessage {...this.state.iconMessage} />
                        )}
                    </div>
                ) : (
                    <div className="content flex middle center">
                        <IconMessage {...this.state.iconMessage}/>
                    </div>
                )}
            </React.Fragment>
        )
    }
}


export default Blog