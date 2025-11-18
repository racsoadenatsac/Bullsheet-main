import React, {useRef} from "react";
import FileDrop from './FileDrop';
import {useSelector} from 'react-redux';
import {selectPage} from '../store/fileSlice';
import {useEffect} from "react";

export default function ExcelUpload() {
    const page = useSelector(selectPage);
    if (page == 0) {
        return (
            <>
                <div>
                    <div className="title">Let&apos;s create magic</div>
                    <div className="message">Generate ML apps from spreadsheet models, in one step!</div>
                </div>
                <div className="inner">
                    <div className="title">Upload Excel model</div>
                    <div className="message">With <span>Training Data</span></div>
                    <FileDrop type="excel-model"/>
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
                    <div className="title">Your Excel File Has Been Uploaded</div>
                    <div className="message">Resultset will be ready shortly.</div>
                    <FileDrop/>
                </div>
            </>
        );
    }
}
