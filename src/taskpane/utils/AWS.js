const spreadsheetid = '1uw1y7whqof3hbklskp8ljwzorlemd-kynfdl0xl79qo';
const Bucket = 'sparksheet';
const IdentityPoolId = 'us-west-2:4a1972cb-1fbf-4fac-a59f-206281ef0055';
const regionCognito = 'us-west-2';

const credentialsCognito = new AWS.CognitoIdentityCredentials({IdentityPoolId})

AWS.config = new AWS.Config({region: regionCognito, credentials: credentialsCognito})

const s3 = new AWS.S3({apiVersion: '2006-03-01', params: Bucket});

const sheetsJsExtractor = () => {
};

const uploadToAWSS3 = (Key, Body) => {
    return new Promise((resolve, reject) => {
        s3.putObject({Bucket, Key, Body}, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
};

const getSignedUrl = (Key) => {
    return new Promise((resolve, reject) => {
        console.log('entra a la promesa')
        s3.getSignedUrl('getObject', {Bucket, Key, Expires: 30 * 60}, (err, data) => {
            if (err) {
                console.log('entra a err',err);
                return reject(err);
            }
            return resolve(data);
        });
    });
};

const downloadFromAWSS3 = (Key) => {
    //console.log('entra a Key', Key);
    return new Promise((resolve, reject) => {
        s3.getObject({Bucket, Key}, (err, data) => {
            if (err) {
                console.log(err.stack);
                return reject(err);
            }
            //console.log('entra a download');
            return resolve(data);
        });
    });
};

const resultsStatusToPercentage = (status) => {
    let step = -1;
    switch (status) {
        case "Deploying Cluster":
            step = 1;
            break;
        case "Reading Formulas and Data":
            step = 2;
            break;
        case "Extracting Prototype Header and Formulas":
            step = 3;
            break;
        case "Arranging Formulas":
            step = 4;
            break;
        case "Arranging Header":
            step = 5;
            break;
        case "Arranging Data":
            step = 6;
            break;
        case "Mounting Storage Area":
            step = 7;
            break;
        case "Creating Distributed Accumulators for Data":
            step = 8;
            break;
        case "Creating Distributed Accumulators for Logs":
            step = 9;
            break;
        case "Registering Cloud Functions":
            step = 10;
            break;
        case "Running Parallel Job":
            step = 11;
            break;
        case "Collecting Accumulator Data":
            step = 12;
            break;
        case "Collecting Accumulator Logs":
            step = 13;
            break;
        case "Finalizing Job":
            step = 14;
            break;
        case "Writing Output Resultset File":
            step = 15;
            break;
        case "Done":
            step = 16;
            break;
    }
    return Math.ceil((step / 16) * 100);
}

export const getResults = async (timestamp) => {
    //console.log('entra a getResults');
    getSignedUrl()
    return downloadFromAWSS3(`${spreadsheetid}/${timestamp}/output/output.csv`);
};

export const getResultsSignedUrl = async (timestamp) => {
    return getSignedUrl(`${spreadsheetid}/${timestamp}/output/output.csv`);
};

export const getResultsStatus = async (timestamp) => {
    const data = await downloadFromAWSS3(`${spreadsheetid}/${timestamp}/output/status`);
    const status = data.Body.toString('ascii');
    const percentage = resultsStatusToPercentage(status);
    return {status, percentage};
};

const uploadFile = (current_time_stamp, file, content) => {
    const {type, name} = file;

    return uploadToAWSS3(
        `${spreadsheetid}/${current_time_stamp}/data/${name}.data`,
        new Blob([content], {type})
    );
};

const uploadSpreadsheetData = async (current_time_stamp) => {
    const range = await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const range = sheet.getUsedRange(false);
        range.load("values");
        range.load("formulas");
        return range;
    });

    const promiseTimestamp = uploadToAWSS3(
        `${spreadsheetid}/current_run_timestamp.csv`,
        `"${JSON.stringify(current_time_stamp)}"`);

    const promiseExcelRange = uploadToAWSS3(
        `${spreadsheetid}/${current_time_stamp}/model/excelrange.json`,
        `"${JSON.stringify(range.formulas[1])}"`
    );

    const promiseHeader = uploadToAWSS3(
        `${spreadsheetid}/${current_time_stamp}/model/header.json`,
        `"${JSON.stringify(range.formulas[0])}"`
    );

    const promiseStatus = uploadToAWSS3(
        `${spreadsheetid}/${current_time_stamp}/output/status`,
        "Deploying Cluster"
    );

    return Promise.all([promiseTimestamp, promiseExcelRange, promiseHeader, promiseStatus]);
};

export const dropCallback = (timestamp, acceptedFiles, callback) => {
    acceptedFiles.forEach(async (file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = async () => {
            const content = reader.result;
            // await console.log('uploadFile', uploadFile(timestamp, file, content));
            // use SheetJS instead for stand-alone webpage
            //await uploadSpreadsheetData(timestamp);
            if (callback) {
                callback(file);
            }
        };
        reader.readAsArrayBuffer(file);
    });
}