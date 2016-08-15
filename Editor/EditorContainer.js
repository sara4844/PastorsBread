/**
 * Created by Sa on 7/14/2016.
 */
/* This file contains the code that initializes our editor
    Defines: the css styles we want users to be able to apply to elements
            the regions of the page we want to be editable
            a mechanism for saving our content
            configuration of an image handler
*/
//var Firebase = require("firebase");
//var ContentTools = require("ContentTools-master");

window.addEventListener('load', function() {
    var editor;

    //adding style author to be applied to paragraph tags
    //StylePalette.add is used to add a list of styles to the editor
    //      A Style instance has format 'display name', 'css class', [list of tags to apply style to]
    ContentTools.StylePalette.add([
        new ContentTools.Style('Author', 'author', ['p']),
        new ContentTools.Style('By-line', 'article__by-line', ['p']),
        new ContentTools.Style('Caption', 'article__caption', ['p']),
        new ContentTools.Style('Example', 'example', ['pre']),
        new ContentTools.Style('Example + Good', 'example--good', ['pre']),
        new ContentTools.Style('Example + Bad', 'example--bad', ['pre'])
    ]);

    //initialize editor and specify which elements on the page are editable
    editor = ContentTools.EditorApp.get();
    editor.init('*[data-editable]', 'data-name');

    // auto-save content
    editor.addEventListener('start', function (ev) {
        var _this = this;

        //call save every 30 seconds
        function autoSave() {
            _this.save(true);
        };
        this.autoSaveTimer = setInterval(autoSave, 30 * 1000);
    });

    editor.addEventListener('stop', function (ev) {
        //stop the autosave
        clearInterval(this.autoSaveTimer);
    });

    // Save content
    editor.addEventListener('saved', function(ev) {
        var name, payload, regions, xhr, passive;

        // check if this was a passive save
        passive = ev.detail().passive;

        //check that something changed
        regions = ev.detail().regions;
        if (Object.keys(regions).length == 0) {
            return;
        }
        //set the editor as busy while we save changes
        this.busy(true);
        var myFirebaseRef = new Firebase("https://parsetext-7e9a2.firebaseio.com/");
        var newFileRef = myFirebaseRef.child("Trial22");
        var temp =document.getElementById("heading").innerHTML +
            document.getElementById("main-content").innerHTML;

        newFileRef.set({
            content: temp
        });

        editor.busy(false);

    });
    document.getElementById("retrieve-data").onclick = function () {
        firebase.database().ref('Trial').on('value', function (snapshot) {
            console.log(snapshot.val());
            document.getElementById("render-here").innerHTML = snapshot.val().content;
        } );
    };

});