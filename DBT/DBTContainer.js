/**
 * Created by Sa on 8/13/2016.
 */
/**
 * Created by Sa on 7/20/2016.
 */
//ENGKJVO1ET – Old Testament non-drama text
var dam_id = "ENGESV";
var oldNew = "O";
var bookId = "";
var chapterId = "";

// initializing dropdown values
window.addEventListener('load', function() {
    var input = '';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
            input = xmlhttp.response;
            handleInput(input);
        }
    };
    xmlhttp.open("GET","./DBT/Bible.json",true);
    xmlhttp.send();

    function handleInput(input) {
        var versionList = JSON.parse(input);
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

    handleVersions ();
});

//listing books based on language and version selected
function handleVersions() {
    var bookList = "";
    var book_id = "";
    var book_name = "";
    var testament = "O";
    var old  = true;
    var display = "<option value='' disabled selected hidden>Select book...</option>" +
        "<option value=''></option><optgroup id='O' label='Old Testament'>";

    var url = "http://dbt.io/library/book?key=fc1dd77f8c68e2a34e22a04944423843&v=2&dam_id=";
    url += dam_id;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.status == 200 && xhttp.readyState == 4){
            bookList = xhttp.response;
            bookList = JSON.parse(bookList);
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
                    display += "</optgroup><option value=''></option><optgroup id='N' label='New Testament'>";
                    old = false;
                }
                display += "<option value='" + book_id + "'>" + book_name + "</option>";

            }
            document.getElementById("books").innerHTML = display+"<option value=''></option></optgroup>";
        }
    };
    xhttp.open("GET",url,true);
    xhttp.send();
}

//listing number of chapters based on book selected
function handleBooks() {
    var url = "http://dbt.io/library/chapter?key=fc1dd77f8c68e2a34e22a04944423843&v=2&dam_id=";
    url += dam_id + oldNew + "2ET&book_id=" + bookId;
    var chapterList = "";
    var display = "<h3 class='ui header'>Chapter Listings:</h3>";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.status == 200 && xhttp.readyState == 4){
            chapterList = xhttp.response;
            chapterList = JSON.parse(chapterList);
            for (var i = 0; i < chapterList.length; i++ ) {
                var p = i + 1;
                display += "<button onclick='handleChapters(this.id)' id='" +
                    p + "' class='ui button'>" + p + "</button>";

            }
            document.getElementById("chapters").innerHTML = display;
        }
    };
    xhttp.open("GET",url,true);
    xhttp.send();
}

function handleChapters(id) {
    chapterId = id;
    renderText();
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
    var lang = "";
    var book = "";
    var dropdownVersion = document.getElementById("version");
    var lang = dropdownVersion.options[dropdownVersion.selectedIndex].parentNode.label;
    var langBegin = lang.length - 4;
    var langEnd = lang.length - 1;

    if(lang != "")
        lang = lang.substring(langBegin, langEnd);

    var book = dropdownVersion.options[dropdownVersion.selectedIndex].value;

    dam_id = lang + book;
    handleVersions();
    if (bookId != "" && chapterId != "") renderText();
}