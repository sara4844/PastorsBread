/**
 * Created by Sa on 8/14/2016.
 */
import React, { Component } from 'react'
import DBTContainer from '../DBT/DBTContainer'
import Editor from './Editor'

export default class Main extends Component {
    render () {
        return (
            <div className="ui horizontal segments">
                <div className="ui segment">
                    <h1>We are here</h1>
                </div>
                <div className="ui basic segment">
                    <h1>Bible</h1>
                    <DBTContainer/>
                </div>
                <div className="ui segment">
                    <h1>Fancy Editor</h1>
                    <Editor />
                </div>
            </div>

        )
    }
}