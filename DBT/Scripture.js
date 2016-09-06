/**
 * Created by Sa on 9/2/2016.
 */
import React from "react"

function httpGet (url, passage) {
    let input = '';
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
            input = xmlhttp.response;
            passage = input;
            passage = JSON.parse(passage);
        }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

export default function Scripture({version, book, chapter, on, url}) {
    url += version + on + "2ET&book_id=" + book + "&chapter_id=" + chapter;
    let passage = "";
    httpGet(url, passage);
    var textArr = [];

    for (var i = 0; i < passage.length; i++) {
        var obj = passage[i];
        for (var key in obj) {
            if (key == "verse_id")
                input += obj[key] + ". ";
            if (key == "verse_text")
                input += obj[key];
        }
        textArr.push(input);
        input = "";
    }

    return (
        <div>
            {textArr.map((item) => {
                return <div className="ui container"><p>{i}</p>
                    <hr style='display: none'/>
                </div>;
            })}
        </div>
    )
}
