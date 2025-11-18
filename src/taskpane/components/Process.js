import React, {useEffect, useState} from "react";
import {CircularProgressbarWithChildren} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useSelector, useDispatch} from 'react-redux';
import {setFile, selectFile, nextPage, selectPage, setTimestamp} from '../store/fileSlice';

import {getResultsStatus, getResults, getSignedUrl} from "../utils/AWS";
import {selectTimestamp} from '../store/fileSlice';

export default function Process() {
    const timestamp = localStorage.getItem('timestamp');
    const [intervalId, setIntervalId] = React.useState(-1);
    const [percentage, setPercentage] = React.useState(0);
    const [status, setStatus] = React.useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    const dispatch = useDispatch();
    const spreadsheetid = '1uw1y7whqof3hbklskp8ljwzorlemd-kynfdl0xl79qo';
    const current_time_stamp = localStorage.getItem('timestamp');
    const Bucket = 'sparksheet';
    let title, message, results;
    const s3 = new AWS.S3({apiVersion: '2006-03-01', params: Bucket});

    useEffect(() => {
        //alert('Se monta');
        async function getStatus() {
            try {
                const {status: newStatus, percentage: newPercentage} = await getResultsStatus(timestamp);
                if (newPercentage > percentage) {
                    setPercentage(newPercentage);
                    setStatus(newStatus);
                    if (newStatus === 'Done') {
                        var params = {
                            Bucket: "sparksheet",
                            Key: spreadsheetid + "/" + current_time_stamp + "/output/output.csv"
                        };
                        await s3.getSignedUrl('getObject', params, (err, data) => {
                            if (err) {
                                console.log('err', err.stack)
                            }
                            console.log(data);
                            setDownloadUrl(data);
                            console.log(downloadUrl);
                            localStorage.setItem('url', data);
                            dispatch(nextPage());
                        });
                    }
                }
                if (newPercentage > 90) {
                    const results = await getResults(timestamp);
                    setPercentage(100);
                    setStatus('Completed');
                }
            } catch (err) {
                console.error(err);
            }
        };
        if (intervalId < 0) {
            setIntervalId(setInterval(() => getStatus(), 5000));
        } else if (percentage == 100) {
            clearInterval(intervalId);
        }
    });
    useEffect(() => {
        console.log(downloadUrl);
    }, [downloadUrl]);
    if (percentage == 0) {
        title = 'Your model is firing up!';
        message = 'Bullsheet is building you <span>a personal AI Cloud</span>.';
        results = <div className="message">Your insights will appear here shortly.</div>;
    } else if (percentage < 100) {
        title = 'Your model is running!';
        message = 'Generating new data features and insights.';
        results = <div className="message">Your insights will appear here shortly.</div>;
    } else {
        title = 'Done!';
        message = 'Your insights are ready.';
        results = <div className="message">Your insights will appear here shortly.</div>;
    }

    return (
        <>
            <div>
                <div className="title">Let&apos;s create magic</div>
                <div className="message">Generate ML apps from spreadsheet models, in one step!</div>
            </div>
            <div className="inner">
                <div className="title">{title}</div>
                <div className="message" dangerouslySetInnerHTML={{__html: message}}></div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                    <CircularProgressbarWithChildren value={percentage} strokeWidth={12}>
                        <div className='progress-bar-title'>{percentage}%</div>
                        {status && <div style={{marginTop: '5px'}}>{status}</div>}
                    </CircularProgressbarWithChildren>
                </div>
                <div>
                    <div className="title">Results</div>
                    {downloadUrl &&
                    <div className="removable-link">
                        <a href={downloadUrl}
                           download="output.csv"
                           target="_blank"
                           title={`run-${current_time_stamp}`}
                        >Output.csv</a>
                    </div>}
                </div>
            </div>
        </>
    )
}