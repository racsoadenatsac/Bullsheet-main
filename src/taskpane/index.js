import "office-ui-fabric-react/dist/css/fabric.min.css";   
import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import * as React from "react";
import * as ReactDOM from "react-dom";

import store from './store/store';
import { Provider } from 'react-redux';

import './styles/taskpane.less'
import './index.css';
/* global AppCpntainer, Component, document, Office, module, React, require */

initializeIcons();

let isOfficeInitialized = false;

localStorage.setItem('timestamp', Date.now());

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component isOfficeInitialized={isOfficeInitialized} />
      </Provider>
    </AppContainer>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
if (typeof Office != 'undefined') {
  Office.initialize = () => {
    isOfficeInitialized = true;
    render(App);
  };
} else {
  isOfficeInitialized = true;
}

/* Initial render showing a progress bar */
render(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}

// const current_time_stamp = Date.now();
// console.log("Current run = " + current_time_stamp);

// const paramsSpreadsheetID = {
//   Bucket,
//   Key: spreadsheetid + "." + "id"
// };

// const paramsTimestamp = {
//   Bucket,
//   Key: spreadsheetid + "/current_run_timestamp.csv",
// };

// const drop = document.getElementById('drop');
// const list = document.getElementById('list');

// function handleDrop(e) {
//   e.preventDefault();
//   let dt = e.dataTransfer;
//   let files = dt.files;
//   for (var i = 0; i < files.length; i++) {
//     var file = files[i];
//     var reader = new FileReader();
//     reader.addEventListener('loadend', function (e) {
//       const progressNode = document.createElement('p')
//       progressNode.innerHTML = '<p class="loader" id="test">Loading...</p>';

//       list.appendChild(progressNode);

//       s3.putObject({
//         Bucket,
//         Key: spreadsheetid + "/" + current_time_stamp + "/data/" + file.name + ".data",
//         //ACL: 'public-read',
//         Body: new Blob([reader.result], { type: file.type })
//       }, (err) => {
//         if (err) { console.log("This Error: " + err); }
//         else {
//           console.log("File lines: " + file.size)
//           const uploadedFileNode = document.createElement('p');
//           console.log("//s3.amazonaws.com/sparksheet/" + spreadsheetid + "/" + current_time_stamp + "/" + file.name);
//           uploadedFileNode.innerHTML = '<a href="//s3.amazonaws.com/sparksheet/' + spreadsheetid + "/" + current_time_stamp + "/data/" + file.name + ".data" + '" style="color:white;">' + file.name + '</a>';
//           //list.appendChild(uploadedFileNode);
//           const element = document.getElementById('test');
//           element.parentNode.removeChild(element);
//           window.location.href = 'https://localhost:3000/src/taskpane/taskpane2.html?current_run_timestamp=' + current_time_stamp + "&uploaded_file_name=" + file.name;

//           // Usage!
//           sleep(2000).then(() => { window.close(); });
//         }
//       }).then(() => {
//           const uploadedFileNode = document.createElement('p');
//           uploadedFileNode.innerHTML = '<p></p><a href=a href="//s3.amazonaws.com/sparksheet/' + current_time_stamp + "/data/" + file.name + '">' + file.name + ".data" + '</a>';
//           list.appendChild(uploadedFileNode);
//           sleep(2000).then(() => { window.close(); });
//         });
//     });
//     reader.readAsArrayBuffer(file);
//   }
//   return false;
// }

// Tells the browser that we *can* drop on this target
// drop.addEventListener('dragenter', cancel);
// drop.addEventListener('dragover', cancel);
// drop.addEventListener('drop', handleDrop);
