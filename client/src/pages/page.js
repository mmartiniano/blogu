import React from 'react'
import { reservedWords } from '../config'
import Blog from './blog'
import Account from './account'
import { Context } from '../context'

/*
* Blogu page resolver
*
* Display a blog page (owner info and its posts) or a blogu system page
*
*/

class Page extends React.Component {

    static contextType = Context

    render() {

        const isBlog = reservedWords.find( word => this.props.match.params.page === word) ? false : true

        return (
            <React.Fragment>
                {isBlog ? (
                    <Blog history={this.props.history} username={this.props.match.params.page}/>
                ) : (
                    <Account history={this.props.history} />
                )}
            </React.Fragment>
        )
    }
}


export default Page