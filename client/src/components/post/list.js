import React from 'react'
import Post from './index'

export default class List extends React.Component {

    static defaultProps = {
        posts: [],
        history: undefined
    }

    constructor(props) {
        super(props)

        this.state = {
            posts: this.props.posts
        }
    }

    handleDelete = index => {
        const postList = [...this.state.posts]
        postList.splice(index, 1)

        this.setState({
            posts: postList
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.posts.map( (post, index) => {
                    return <Post type="card" index={index} history={this.props.history} key={post._id} onDelete={this.handleDelete} {...post}/>
                })}
            </React.Fragment>
        )
    }
}