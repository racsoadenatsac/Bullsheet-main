import React, {useEffect} from 'react';
import Header from './Header';
import WrapperContainer from './WrapperContainer';
import Aligner from './Aligner';
import Footer from './Footer';
import './ReadyView-styles.css';

const ReadyView = () => {
    useEffect(() => {
        console.log('se monta vista')
    }, [])
    return (
        <>
            <WrapperContainer/>
            <Aligner/>
        </>
    )
};
export default ReadyView;