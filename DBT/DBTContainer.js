/**
 * Created by Sa on 8/13/2016.
 */
/**
 * Created by Sa on 7/20/2016.
 */
import React, { Component, PropTypes } from 'react'
import handleInput from '../app/handleInput'
import handleBookListing from '../app/handleBookListing'

import DBT from '../app/DBT'
import Scripture from './Scripture'

//ENGKJVO1ET – Old Testament non-drama text
var dam_id = "ENGESV";
var oldNew = "O";
var bookId = "";
var chapterId = "";
var urlVerseRequest = "http://dbt.io/text/verse?key=fc1dd77f8c68e2a34e22a04944423843&v=2&dam_id=";

//listing number of chapters based on book selected
function listChapters() {
    let url = "http://dbt.io/library/chapter?key=fc1dd77f8c68e2a34e22a04944423843&v=2&dam_id=";
    url += dam_id + oldNew + "2ET&book_id=" + bookId;
    let chapterList = "";
    let display = "";
    let ids = [];

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.status == 200 && xhttp.readyState == 4){
            chapterList = xhttp.response;
            chapterList = JSON.parse(chapterList);
        }
    };
    xhttp.open("GET",url,true);
    xhttp.send();


    for (var i = 0; i < chapterList.length; i++ ) {
        ids.push(i + 1);
    }
    return(
        <div>
            <h3 className='ui header'>Chapter Listings:</h3>
            {ids.map((id) => <button onClick={handleChapters} className='ui button'>{id}</button> )}
        </div>
    )
}

function handleChapters() {
    chapterId = this.props.children;

}


/*
 var webUrl = "http://dbt.io/text/verse?key=fc1dd77f8c68e2a34e22a04944423843&v=2";
 var langId = "" ;
 var verId = "";
 var bookSection = "";
 var damId = "&dam_id=ENGESVO2ET";
 var bookName = "&book_name=Genesis";
 var chapterId = "&chapter_id=4";
 */
function thisBook() {
    var dropdownBooks = document.getElementById("books");
    var currVal = dropdownBooks.options[dropdownBooks.selectedIndex].value;
    var testament = dropdownBooks.options[dropdownBooks.selectedIndex].parentNode.id;
    console.log(testament);
    if (testament == "N") oldNew = "N";
    else oldNew = "O";
    if(currVal != "") {
        bookId = currVal;
        handleBooks();
        document.getElementById("chapters").style.display = "block";

    } else {
        document.getElementById("chapters").style.display = "none";
    }
}
/* Once version is selected, make request for book listing in this version
 *  then, do extra check to see if bookName != "". In that case call render-text function.
 */
function thisVersion() {
    const dropdownVersion = document.getElementById("version");
    let lang = dropdownVersion.options[dropdownVersion.selectedIndex].parentNode.label;
    const langBegin = lang.length - 4;
    const langEnd = lang.length - 1;

    if(lang != "")
        lang = lang.substring(langBegin, langEnd);

    const book = dropdownVersion.options[dropdownVersion.selectedIndex].value;

    dam_id = lang + book;
    httpGet(`http://dbt.io/library/book?key=fc1dd77f8c68e2a34e22a04944423843&v=2&dam_id=${dam_id}`,handleVersions);
    if (bookId != "" && chapterId != "")
        return <Scripture version={dam_id} book={bookId} chapter={chapterId} ON={oldNew} url={urlVerseRequest}/>
}

export default class DBTContainer extends Component {
    render() {
        return (
            <div>
                <div className="ui center aligned basic segment">
                    <handleBookListing requestUrl="http://dbt.io/library/book?key=fc1dd77f8c68e2a34e22a04944423843&v=2&dam_id={dam_id}" />
                    <handleInput requestUrl="./DBT/Bible.json"/>
                    done
                    <br/>
                    <br/>

                </div>
            </div>
        )
    }
}


/*
 <DropBook/>
 <DropVersion />
 {selected? <ShowChapters />: noshow}
 <DBT version={() => thisVersion()} book={() => thisBook()} />

 {httpGet("./DBT/Bible.json", handleInput)}
 {httpGet(`http://dbt.io/library/book?key=fc1dd77f8c68e2a34e22a04944423843&v=2&dam_id=${dam_id}`,handleVersions)}
*/















































 /*




//listing books based on language and version selected
function handleVersions(input) {
    let bookList = "";
    let book_id = "";
    let book_name = "";
    let testament = "O";
    let old  = true;
    let display = `<option value="" disabled selected hidden>Select book...</option>
<option value=''></option>
<optgroup id='O' label='Old Testament'>`;

    bookList = input;
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

    }
    document.getElementById("books").innerHTML = display+"<option value=''></option></optgroup>";
}
*/
/*


// initializing dropdown values
function handleInput(input) {
    var versionList = input;
    var listing = "<option value='' disabled selected hidden>English Standard Version (ESV)</option>";

    for (var newLang in versionList) {
        listing += "<option value=''></option><optgroup label='" +
            newLang + "'>";
        var eleBook = versionList[newLang];
        eleBook.map(function (b) {
            listing += "<option value='" + b.substring(b.length - 4, b.length - 1) + "'>" + b + "</option>";
        });
        listing += "</optgroup>";
    }
    document.getElementById("version").innerHTML = listing + "<option value=''></option>";
}








function httpGet (url, callBack) {
    let input = '';
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
            input = xmlhttp.response;
            callBack(input);
        }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}










function renderText() {
    var url = "http://dbt.io/text/verse?key=fc1dd77f8c68e2a34e22a04944423843&v=2&dam_id=";
    url += dam_id + oldNew + "2ET&book_id=" + bookId + "&chapter_id=" + chapterId;
    var intro = "<div class='ui container'><p>";
    var outro = "</p><hr style='display: none'/></div>";
    var input = "";
    var body = "";
    var passage = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.status == 200 && xhttp.readyState == 4){
            passage = xhttp.response;
            passage = JSON.parse(passage);
            for (var i = 0; i < passage.length; i++) {
                var obj = passage[i];
                for (var key in obj) {
                    if (key == "verse_id")
                        input += obj[key] + ". ";
                    if (key == "verse_text")
                        input += obj[key];
                }
                body += intro + input + outro;
                input = "";
            }

            document.getElementById("render-books").innerHTML = body;
        }
    };
    xhttp.open("GET",url,true);
    xhttp.send();
    }

*/