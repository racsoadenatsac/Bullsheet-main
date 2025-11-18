import React, {useEffect} from "react";
import {useDropzone} from 'react-dropzone';
import {setTimeout} from "core-js";
import {useSelector, useDispatch} from 'react-redux';
import {dropCallback} from "../utils/AWS";
import {setFile, selectFile, nextPage, selectPage, setTimestamp} from '../store/fileSlice';
import {ProgressIndicator} from 'office-ui-fabric-react/lib/ProgressIndicator';
import LibraryAddCheckRoundedIcon from '@material-ui/icons/LibraryAddCheckRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';

import {getSignedUrl} from "../utils/AWS";

export default function FileDrop({type}) {
    const page = useSelector(selectPage);
    const dispatch = useDispatch();
    const [percentComplete, setPercentComplete] = React.useState(0);

    const spreadsheetid = '1uw1y7whqof3hbklskp8ljwzorlemd-kynfdl0xl79qo';
    const Bucket = 'sparksheet';
    const IdentityPoolId = 'us-west-2:4a1972cb-1fbf-4fac-a59f-206281ef0055';
    const regionCognito = 'us-west-2';

    const credentialsCognito = new AWS.CognitoIdentityCredentials({IdentityPoolId})

    AWS.config = new AWS.Config({region: regionCognito, credentials: credentialsCognito})

    const s3 = new AWS.S3({apiVersion: '2006-03-01', params: Bucket});

    const current_time_stamp = localStorage.getItem('timestamp');
    // alert(current_time_stamp);

    const onDrop = React.useCallback(async (acceptedFiles) => {
        var files = acceptedFiles;
        if (type === 'excel-model') {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var reader = new FileReader();
                reader.addEventListener("loadend", function (e) {
                    var progressNode = document.createElement("p");
                    progressNode.innerHTML = '<p class="loader" id="test">Loading...</p>';

                    /*** SheetsJS ***/
                    var data = new Uint8Array(e.target.result);
                    var header = XLSX.read(data, {type: 'array', sheetRows: 1});
                    var workbook = XLSX.read(data, {type: 'array', sheetRows: 1100});
                    var prototype = XLSX.read(data, {type: 'array', sheetRows: 2, cellFormula: true});

                    var first_header_sheet_name = header.SheetNames[0];
                    var first_sheet_name = workbook.SheetNames[0];
                    var first_prototype_sheet_name = prototype.SheetNames[0];

                    //var address_of_cell = 'A2';

                    /* Get worksheet */
                    var headersheet = header.Sheets[first_header_sheet_name];
                    var worksheet = workbook.Sheets[first_sheet_name];
                    var prototypesheet = prototype.Sheets[first_prototype_sheet_name];

                    var o2 = XLSX.utils.sheet_to_csv(headersheet, {FS: "|", RS: "\n"});
                    var o = XLSX.utils.sheet_to_csv(worksheet, {FS: "|", RS: "\n"});
                    var o3 = XLSX.utils.sheet_to_formulae(prototypesheet);

                    //o2 = o2.replace("/\=/g","|");

                    var myStr = o2.split("|");
                    var myStrO = o.split("|");
                    var myStrLen = myStr.length;
                    var newStr = o3;//.toString()
                    var o2Str = [];
                    var o3Str = [];

                   // console.log("FORMULAE: " + newStr.toString().split("|"));

                    // console.log("\nLENGTH IS: " + myStrLen);

                    newStr.forEach(myFunction);

                    function myFunction(value, index, array) {
                        if (index > 1) {
                            o2Str.push(value.replace(/^\w+\d+='.*/g, "").replace(/^\w+\d+=/g, "=").replace(/=\d+\.?\d*/g, ""));
                        }
                    }

                    var paramsSpreadsheetFormulas = {
                        Bucket: "sparksheet",
                        Key: spreadsheetid + "/" + current_time_stamp + "/model/formulas.web",
                        Body: new Blob([o2Str.join("|")], {type: "text/csv"})
                    };

                    s3.putObject(paramsSpreadsheetFormulas, function (err, data) {
                        if (err) console.log("Hello world failed!"); // an error occurred
                        else {
                            console.log("Hello world!");
                        }
                    });

                    var paramsSpreadsheetHeader = {
                        Bucket: "sparksheet",
                        Key: spreadsheetid + "/" + current_time_stamp + "/model/header",
                        Body: new Blob([myStr.join("|")], {type: "text/csv"})
                    };

                    s3.putObject(paramsSpreadsheetHeader, function (err, data) {
                        if (err) console.log("Hello world failed!"); // an error occurred
                        else {
                            console.log("Hello world!");
                        }
                    });

                    var paramsSpreadsheetCSV = {
                        Bucket: "sparksheet",
                        Key: spreadsheetid + "/" + current_time_stamp + "/model/input.data",
                        Body: new Blob([myStrO.join(",")], {type: "text/csv"})
                    };

                    s3.putObject(paramsSpreadsheetCSV, function (err, data) {
                            if (err) console.log("Hello world failed!"); // an error occurred
                            else {
                                console.log("Hello world!");
                                window.localStorage.setItem('FILE.STATUS', file.status);

                                function sleep(time) {
                                    return new Promise((resolve) => setTimeout(resolve, time));
                                }
                            }
                        }
                    )
                });
                reader.readAsArrayBuffer(file);
            }
            dispatch(nextPage());
            setTimeout(() => {
                dispatch(nextPage());
            }, 2000);
        } else if (type === 'csv') {
            try {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var reader = new FileReader();
                    reader.addEventListener("loadend", function (e) {
                        var progressNode = document.createElement("p");
                        progressNode.innerHTML = '<p class="loader" id="test">Loading...</p>';
                        s3.putObject(
                            {
                                Bucket: Bucket,
                                Key:
                                    spreadsheetid +
                                    "/" +
                                    current_time_stamp +
                                    "/data/" +
                                    file.name +
                                    ".data",
                                //ACL: 'public-read',
                                Body: new Blob([reader.result], {type: file.type}),
                            },
                            function (err) {
                                if (err) {
                                    console.log("This Error: " + err);
                                } else {
                                    console.log("File lines: " + file.size);
                                    var uploadedFileNode = document.createElement("p");
                                    console.log(
                                        "//s3.amazonaws.com/sparksheet/" +
                                        spreadsheetid +
                                        "/" +
                                        current_time_stamp +
                                        "/" +
                                        file.name
                                    );
                                    uploadedFileNode.innerHTML =
                                        '<a href="//s3.amazonaws.com/sparksheet/' +
                                        spreadsheetid +
                                        "/" +
                                        current_time_stamp +
                                        "/data/" +
                                        file.name +
                                        ".data" +
                                        '" style="color:white;">' +
                                        file.name +
                                        "</a>";
                                    //list.appendChild(uploadedFileNode);
                                    var element = document.getElementById("test");
                                    element.parentNode.removeChild(element);
                                    window.location.href =
                                        "./taskpane2.html?current_run_timestamp=" +
                                        current_time_stamp +
                                        "&uploaded_file_name=" +
                                        file.name;

                                    // sleep time expects milliseconds
                                    function sleep(time) {
                                        return new Promise((resolve) => setTimeout(resolve, time));
                                    }

                                    // Usage!
                                    sleep(2000).then(() => {
                                        window.close();
                                    });
                                }
                            }
                        )/*.then(function () {
                    var uploadedFileNode = document.createElement("p");
                    uploadedFileNode.innerHTML =
                        '<p></p><a href=a href="//s3.amazonaws.com/sparksheet/' +
                        current_time_stamp +
                        "/data/" +
                        file.name +
                        '">' +
                        file.name +
                        ".data" +
                        "</a>";
                    list.appendChild(uploadedFileNode);

                    // sleep time expects milliseconds
                    function sleep(time) {
                        return new Promise((resolve) => setTimeout(resolve, time));
                    }

                    // Usage!
                    sleep(2000).then(() => {
                        window.close();
                    });
                });*/
                    });
                    reader.readAsArrayBuffer(file);
                }
                dispatch(nextPage());
                setTimeout(() => {
                    dispatch(nextPage());
                }, 2000);
            } catch (error) {
                console.error(error);
            }
        }
        //dispatch(nextPage());
        //setPercentComplete(1);


        /*await dropCallback(timestamp, acceptedFiles, (file) => {
            const {name, path, size} = file;
            //dispatch(setFile({name, path, size}));
            setTimeout(() => {
                console.log('Entra settimeout');
                dispatch(nextPage());
            }, 2000);
        });*/
    }, []);

    const {getRootProps, getInputProps} = useDropzone({onDrop});
    const file = useSelector(selectFile);

    if (page == 1) {
        return (
            <div className="file-upload-progress-bar">
                <FileCopyRoundedIcon className="file-copy"/>
                <ProgressIndicator label={file.name} barHeight={10} percentComplete={percentComplete}/>
                <LibraryAddCheckRoundedIcon className="download-done"/>
            </div>
        );
    } else {
        return (
            <div id="drop" {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16">
                    <path
                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path
                        d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                <div>
                    Drag or Browse for your data here.
                </div>
            </div>
        );
    }
}