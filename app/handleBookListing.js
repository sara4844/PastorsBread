/**
 * Created by Sa on 9/3/2016.
 */
import React, { Component, PropTypes } from 'react'
import httpGet from '../app/Client'

function newSelect() {
    console.log("changed in handleBookListing")
}
//listing books based on language and version selected
export default class handleBookListing extends Component {
/*    const { requestUrl } = this.props;
    httpGet(requestUrl);

    let book_id = "";
    let book_name = "";
    let testament = "O";
    let old  = true;
    let display = "";
    console.log("handleBookListing");
    for (var i = 0; i < bookList.length; i++ ) {
        var obj = bookList[i];
        for (var key in obj) {
            if (key == "book_id") {
                book_id = obj[key];
            } else if (key == "book_name") {
                book_name = obj[key];
            } else if (key == "dam_id") {
                testament = obj[key].slice(-1);
            }
        }

        if (testament == "N" && old ) {
            display += `</optgroup><option value=''></option><optgroup id='N' label='New Testament'>`;
            old = false;
        }
        display += `<option value="${book_id}">${book_name}</option>`;

    }*/
    render () {
        let display = "";
        return (
            <select onChange={newSelect} className="ui search dropdown">
                <option value="" disabled selected hidden>Select book...</option>
                <option value=''></option>
                <optgroup id='O' label='Old Testament'>
                    {display}
                    <option value=''></option>
                </optgroup>
            </select>
        )
    }

}
handleBookListing.propTypes = {
    requestUrl: PropTypes.string
};
handleBookListing.defaultProps = {
    requestUrl: ''
};