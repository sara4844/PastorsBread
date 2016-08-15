/**
 * Created by Sa on 8/14/2016.
 */
import React from 'react'

export default function Editor () {
    return (
        <div>
            <div id="heading" data-editable data-name="heading">
                <h1>Content to edit</h1>
            </div>
            <div id="main-content" data-editable data-name="main-content">
                <blockquote>
                    Always code as if the guy who ends up maintaining your code will be a violent psychopath
                    who knows where you live.
                </blockquote>
                <p>John F. Woods</p>
            </div>
            <div>
                <button id="retrieve-data">Retrieve data</button>
                <div id="render-here">
                </div>
            </div>
        </div>
    )
}
