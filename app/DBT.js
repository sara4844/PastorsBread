/**
 * Created by Sa on 8/14/2016.
 */
import React, { PropTypes } from 'react'

export default function DBT({ version, book}) {
    return (
        <div>
            <div id="search-input" className="ui center aligned basic segment">
                <select id="books" onChange={book} className="ui search dropdown" >
                </select>

                <select id="version" onChange={version} className="ui search dropdown" >
                </select>

                <br/>
                <br/>

                <div>
                    <div className="ui tiny buttons" id="chapters" style={{display: 'none'}}>
                    </div>
                </div>

            </div>

            <div className="ui raised very padded text container segment ">
                <div id="render-books" ></div>
            </div>
        </div>
    )
}

DBT.propTypes = {
    version: PropTypes.func,
    book: PropTypes.func
}