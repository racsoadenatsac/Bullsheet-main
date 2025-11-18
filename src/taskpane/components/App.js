import * as React from "react";
import Progress from "./Progress";
import Header from './Header';
import Footer from "./Footer";
import ExcelUpload from './ExcelUpload';
import FileUpload from './FileUpload';
import Process from './Process';
import ReadyView from '../components/Ready/ReadyView';
import {useSelector} from 'react-redux';
import {selectPage} from '../store/fileSlice';

export default function App(props) {
    const {isOfficeInitialized} = props;
    const page = useSelector(selectPage);
    //const page = 5;

    if (!isOfficeInitialized) {
        return (
            <Progress logo="assets/logo-filled.png" message="Please sideload your addin to see app body."/>
        );
    }

    let mainContent;
    if (page < 2) {
        mainContent = (<ExcelUpload/>);
    } else if (page < 4) {
        mainContent = (<FileUpload/>);
    } else if (page < 5) {
        mainContent = (<Process/>);
    } else if (page < 6) {
        mainContent = (<ReadyView/>)
    }

    //mainContent = (<Process/>);
    return (
        <>
            <Header/>
            <div className="center">
                {mainContent}
            </div>
            <Footer/>
        </>
    )
}
