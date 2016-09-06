/**
 * Created by Sa on 9/2/2016.
 */
import React, { PropTypes } from "react"

export default function httpGet (url, callBack) {
    let input = '';
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
            input = xmlhttp.response;
            input = JSON.parse(input);
            return callBack(input);
        }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

httpGet.propTypes = {
    url: PropTypes.string,
    callBack: PropTypes.func
};