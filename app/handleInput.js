/**
 * Created by Sa on 9/2/2016.
 */
import React, { Component, PropTypes } from "react"

function newSelect() {
    console.log("changed in handleInput")
}
// initializing dropdown values
// props past in is the list of versions
export default class handleInput extends Component {
    /*let listing = "";
    console.log("handleBookListing");
    for (var newLang in versionList) {
        listing += "<option value=''></option><optgroup label='" +
            newLang + "'>";
        var eleBook = versionList[newLang];
        eleBook.map(function (b) {
            listing += "<option value='" + b.substring(b.length - 4, b.length - 1) + "'>" + b + "</option>";
        });
        listing += "</optgroup>";
    }*/
    render() {
        return (
            <select onChange={newSelect} className="ui search dropdown">
                <option value='' disabled selected hidden>English Standard Version (ESV)</option>
                {listing}
                <option value=''></option>
            </select>
        )
    }
}

handleInput.propTypes = {
    requestUrl : PropTypes.string
};