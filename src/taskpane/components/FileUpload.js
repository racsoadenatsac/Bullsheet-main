import * as React from "react";
import FileDrop from './FileDrop';
import {useSelector} from 'react-redux';
import {selectPage} from '../store/fileSlice';
import {useEffect} from "react";

export default function FileUpload() {
    const page = useSelector(selectPage);


    if (page == 2) {
        return (
            <>
                <div>
                    <div className="title">Let&apos;s create magic</div>
                    <div className="message">Generate ML apps from spreadsheet models, in one step!</div>
                </div>
                <div className="inner">
                    <div className="title">Upload Data</div>
                    <div className="message">Upload a <span>Test Data</span> file.</div>
                    <FileDrop type="csv" />
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                    <div className="title">Let&apos;s create magic</div>
                    <div className="message">Generate ML apps from spreadsheet models, in one step!</div>
                </div>
                <div className="inner">
                    <div className="title">You Data Has Been Uploaded</div>
                    <div className="message">Resultset will be ready shortly.</div>
                    <FileDrop/>
                </div>
            </>
        );
    }
}
