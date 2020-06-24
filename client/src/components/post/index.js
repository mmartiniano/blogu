import React from 'react'
import Card from '../general/card'
import Metadata from './metadata'
import Modal from '../general/modal'
import PostService from '../../services/post_service'
import { Context } from '../../context'
import { copyToClipboard } from '../../util'

export default class Post extends React.Component {

    static contextType = Context

    static defaultProps = {
        _id: '',
        title: '',
        author: {
            name: '',
            username: '',
            avatar: ''
        },
        text: '',
        created_at: '',
        index: undefined
    }

    constructor(props, context) {
        super(props)

        this.isAuthor = this.props.author._id === context.user.id ? true : false

        this.state = {
            deleting: false
        }
    }

    showDelete = () => {
        this.setState({ deleting: true })
    }

    handleOKDelete = () => {
        this.setState({ deleting: false })
        this.delete()
    }

    handleCancelDelete = () => {
        this.setState({ deleting: false })
    }

    open = () => {
        if (!this.props.history)
            return
        this.context.togglePreloader()
        this.props.history.push(`/post/${this.props._id}`)
    }

    share = () => {
        copyToClipboard(`${window.location.origin}/post/${this.props._id}`)
        this.context.toastIt('Link copied to clipboard')
    }

    edit = () => {
        this.context.setPost(this.props)
        this.context.setPublishing(true)
    }

    delete = () => {
        this.context.togglePreloader()

        PostService.delete(this.props._id)
        .then( response => {
            this.context.toastIt('Post deleted')
            this.props.onDelete(this.props.index)
        })
        .catch( error => {
            this.context.toastIt(error.response ? error.response.data : 'Failed to connect')
        })
        .then( this.context.togglePreloader )
    }

    render() {
        return (
            <React.Fragment>
                {this.props.type === 'card' ? (
                    <Card round={true} color="secondary col s12 m10 l5" className="post pointer" onClick={this.open}>
                        <div className="post-title">{this.props.title}</div>
                        <div className="post-brief"><p>{this.props.text}</p></div>
                        <Metadata {...this.props} isAuthor={this.isAuthor} share={this.share} edit={this.edit} delete={this.showDelete}/>
                    </Card>
                ) : (
                    <div className="col s11 m10 l6">
                        <div className="post-full-title">{this.props.title}</div>
                        <Metadata {...this.props} isAuthor={this.isAuthor} share={this.share} edit={this.edit} delete={this.showDelete}/>
                        <br/>
                        <div className="post-text">{this.props.text}</div>
                    </div>
                )}  
                <Modal style={{height: '170px', textAlign: 'center'}} visible={this.state.deleting} onOK={this.handleOKDelete} onCancel={this.handleCancelDelete}>
                    Are you sure you want to delete this post?
                </Modal>
            </React.Fragment>
        )
    }
}