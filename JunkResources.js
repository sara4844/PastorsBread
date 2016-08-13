/**
 * Created by Sa on 7/18/2016.
 */
/*xhr = new XMLHttpRequest();
 xhr.addEventListener('readystatechange', onStateChange);
 xhr.open('POST', '/save-my-page');
 xhr.send(payload);*/

/*collect the contents of each region into a FormData instance
 payload = new FormData();
 for (name in regions) {
 if (regions.hasOwnProperty(name)) {
 payload.append(name, regions[name]);
 }
 }*/

/* Regions are sent as single JSON value instead of as individual params
 payload = new FormData();
 payload.append('product', document.querySelector('meta[name=product]').getAttribute('content'));
 payload.append('regions', JSON.stringify(regions));
 */


/*send the update content to the server to be saved
 function onStateChange(ev) {
 //check if the request is finished
 if (ev.target.readyState == 4) {
 editor.busy(false);
 if (ev.target.status == '200') {
 //save was successful, notify the user with a flash
 new ContentTools.FlashUI('ok');
 } else {
 //save failed, notify the user with a flash
 new ContentTools.FlashUI('no');
 }
 }
 };*/


/*
 // Initialize Firebase
 var config = {
 apiKey: "AIzaSyB41zY1DrVduZUZVGDRMNCHLcpiA7ofxfw",
 authDomain: "parsetext-7e9a2.firebaseapp.com",
 databaseURL: "https://parsetext-7e9a2.firebaseio.com",
 storageBucket: "parsetext-7e9a2.appspot.com",
 };
 firebase.initializeApp(config);

 // Get a reference to the storage service, which is used to create references in your storage bucket
 var storage = firebase.storage();
 // Create a root reference
 var storageRef = firebase.storage().ref();
 // Create a reference to tempFiles
 var tempFilesRef = storageRef.child('tempFiles.html');
 // Upload file

 var uploadTask = tempFilesRef.put((new XMLSerializer).serializeToString(document));
 // Listen for state changes, errors, and completion of the upload.
 uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
 function(snapshot) {
 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
 var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
 console.log('Upload is ' + progress + '% done');
 switch (snapshot.state) {
 case firebase.storage.TaskState.PAUSED: // or 'paused'
 console.log('Upload is paused');
 break;
 case firebase.storage.TaskState.RUNNING: // or 'running'
 console.log('Upload is running');
 break;
 }
 }, function(error) {
 switch (error.code) {
 case 'storage/unauthorized':
 // User doesn't have permission to access the object
 break;

 case 'storage/canceled':
 // User canceled the upload
 break;
 case 'storage/unknown':
 // Unknown error occurred, inspect error.serverResponse
 break;
 }
 }, function() {
 // Upload completed successfully, now we can get the download URL
 var downloadURL = uploadTask.snapshot.downloadURL;
 });*/