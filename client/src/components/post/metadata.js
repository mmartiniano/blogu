import React from 'react'
import Info from './info'
import Actions from './actions'

export default class Metadata extends React.Component {

    render() {
        return (
            <div className="post-metadata">
                <Info {...this.props}/>
                <Actions {...this.props}/>
            </div>
        )
    }

}