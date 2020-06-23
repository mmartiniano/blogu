import React from 'react'
import Card from '../general/card'
import Metadata from './metadata'
import Modal from '../general/modal'
import PostService from '../../services/post_service'
import { Context } from '../../context'
import { copyToClipboard } from '../../util'

export default class Post extends React.Component {

    static contextType = Context

    constructor(props) {
        super(props)

        this.publicState = {
            _id: '',
            title: '',
            author: {
                name: '',
                username: '',
                avatar: ''
            },
            text: '',
            created_at: '',
            isAuthor: false,
            ...this.props.post,
        }

        this.state = {
            ...this.publicState,
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
        this.context.togglePreloader()
        this.props.history.push(`/post/${this.state._id}`)
    }

    share = () => {
        copyToClipboard(`${window.location.origin}/post/${this.state._id}`)
        this.context.toastIt('Link copied to clipboard')
    }

    delete = () => {
        this.context.togglePreloader()

        PostService.delete(this.state._id)
        .then( response => {
            this.context.toastIt('Post deleted')
            this.props.onDelete(this.props.index)
        })
        .catch( error => {
            this.showToast(error.response ? error.response.data : 'Failed to connect')
        })
        .then( this.context.togglePreloader )
    }

    render() {
        return (
            <React.Fragment>
                {this.props.type === 'card' ? (
                    <Card round={true} color="secondary col s12 m10 l5" className="post pointer" onClick={this.open}>
                        {this.props.post.index}
                        <div className="post-title">{this.state.title}</div>
                        <div className="post-brief"><p>{this.state.text}</p></div>
                        <Metadata {...this.publicState} share={this.share} edit={this.edit} delete={this.showDelete}/>
                    </Card>
                ) : (
                    <div>
                        {this.props.post.index}
                        <div className="post-title">{this.state.title}</div>
                        <div className="post-brief"><p>{this.state.text}</p></div>
                        <Metadata {...this.publicState} share={this.share} edit={this.edit} delete={this.showDelete}/>
                        <Modal style={{height: '170px', textAlign: 'center'}} visible={this.state.deleting} onOK={this.handleOKDelete} onCancel={this.handleCancelDelete}>
                            Are you sure you want to delete this post?
                        </Modal>
                    </div>
                )}
                <Modal style={{height: '170px', textAlign: 'center'}} visible={this.state.deleting} onOK={this.handleOKDelete} onCancel={this.handleCancelDelete}>
                    Are you sure you want to delete this post?
                </Modal>
            </React.Fragment>
        )
    }
}