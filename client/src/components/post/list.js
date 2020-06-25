import React from 'react'
import Post from './index'

export default class List extends React.Component {

    static defaultProps = {
        posts: [],
        onDeleteItem: () => {},
        onEditItem: () => {},
        history: undefined
    }

    constructor(props) {
        super(props)

        this.state = {
            posts: this.props.posts
        }
    }

    handleEdit = () => {
        if (typeof this.props.onEditItem === 'function')
            this.props.onEditItem()
    }

    handleDelete = index => {
        const postList = [...this.state.posts]
        postList.splice(index, 1)

        this.setState({
            posts: postList
        })

        if (typeof this.props.onDeleteItem === 'function')
            this.props.onDeleteItem(this.state.posts.length)
    }

    componentDidUpdate(previousProps) {
        if (this.props.posts !== previousProps.posts)
            this.setState({ posts: this.props.posts })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.posts.map( (post, index) => {
                    return <Post type="card" index={index} history={this.props.history} key={post._id} onDelete={this.handleDelete} onEdit={this.handleEdit} {...post}/>
                })}
            </React.Fragment>
        )
    }
}