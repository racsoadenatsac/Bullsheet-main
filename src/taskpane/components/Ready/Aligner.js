import React, {useEffect,useState} from 'react';

const Aligner = () => {
    const [url, setUrl] = useState('');
    useEffect(() => {
        //alert(localStorage.getItem('downloadUrl'))
        setUrl(localStorage.getItem('url'));
    }, []);
    return (
        <>
            <div className="aligner">
                <div>
                    <p className="lets-create-magic">The new column is your prediction</p>
                    <p className="upload-description">See them in the last column</p>
                </div>
                <div id="list">
                    <div id="drop">
                        <div className="ready-container">
                            <h3>Download your file</h3>
                            <p>It will appear in your Downloads folder. Enjoy!</p>
                            <a className="download-container" style={{cursor: 'pointer'}} href={url}   download="output.csv"
                               target="_blank"
                            >
                                <div>
                                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <path
                                                d="M23.3277 0.637596H2.45007C1.45078 0.637596 0.637573 1.4508 0.637573 2.4501V23.3277C0.637573 24.327 1.45078 25.1402 2.45007 25.1402H23.3277C24.3269 25.1402 25.1402 24.327 25.1402 23.3277V2.4501C25.1402 1.4508 24.3269 0.637596 23.3277 0.637596ZM23.9318 2.4501V6.37718H9.12974V1.84593H23.3277C23.6608 1.84593 23.9318 2.117 23.9318 2.4501ZM2.45007 1.84593H7.921V6.37718H1.84591V2.4501C1.84591 2.117 2.11698 1.84593 2.45007 1.84593ZM1.84591 23.3277V7.58551H7.921V23.9314H2.45007C2.11698 23.9318 1.84591 23.6608 1.84591 23.3277ZM23.3277 23.9318H9.12974V7.58551H23.9318V23.3273C23.9318 23.6608 23.6608 23.9318 23.3277 23.9318Z"
                                                fill="#64748B"/>
                                        </g>
                                        <circle cx="22.9583" cy="22.9583" r="6.04167" fill="#31C48D"/>
                                        <path
                                            d="M21.8195 24.6349L20.4218 23.2373C20.3466 23.1618 20.2444 23.1194 20.1379 23.1194C20.0313 23.1194 19.9291 23.1618 19.8539 23.2373C19.6968 23.3943 19.6968 23.6481 19.8539 23.8052L21.5375 25.4888C21.6946 25.6459 21.9483 25.6459 22.1054 25.4888L26.3668 21.2274C26.5239 21.0703 26.5239 20.8166 26.3668 20.6595C26.2916 20.5841 26.1894 20.5417 26.0829 20.5417C25.9763 20.5417 25.8741 20.5841 25.7989 20.6595L21.8195 24.6349Z"
                                            fill="white"/>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="25.7778" height="25.7778" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div className="download-rect">
                                        <a href={localStorage.getItem('downloadUrl')}
                                           download="output.csv"
                                           target="_blank"
                                           title={`run-${localStorage.getItem('timestamp')}`}
                                        >Output.csv</a>
                                        <p>205 kb</p>
                                    </div>
                                </div>
                                <svg className="download-arrow" width="14" height="18" viewBox="0 0 14 18" fill="none"
                                     xmlns="http://www.w3.org/2000/zsvg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M10 6.5H11.59C12.48 6.5 12.92 7.58 12.29 8.21L7.7 12.8C7.31 13.19 6.68 13.19 6.29 12.8L1.7 8.21C1.07 7.58 1.52 6.5 2.41 6.5H4V1.5C4 0.95 4.45 0.5 5 0.5H9C9.55 0.5 10 0.95 10 1.5V6.5ZM1 17.5C0.45 17.5 0 17.05 0 16.5C0 15.95 0.45 15.5 1 15.5H13C13.55 15.5 14 15.95 14 16.5C14 17.05 13.55 17.5 13 17.5H1Z"
                                          fill="#054FAA"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div className="options-container">
                            <h3>Get more with Bullsheet PRO</h3>
                            <div>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M8 2.66667C10.4267 2.66667 12.4467 4.39333 12.9 6.69333C14.6333 6.81333 16 8.24 16 10C16 11.84 14.5067 13.3333 12.6667 13.3333H4C1.79333 13.3333 0 11.54 0 9.33333C0 7.27333 1.56 5.57333 3.56667 5.36C4.4 3.76 6.07333 2.66667 8 2.66667ZM6.2001 10.86C6.4601 11.12 6.8801 11.12 7.1401 10.86L10.5934 7.40668C10.8534 7.14668 10.8534 6.72668 10.5934 6.46668C10.3334 6.20668 9.91343 6.20668 9.65343 6.46668L6.66676 9.45334L5.7401 8.52668C5.4801 8.26668 5.0601 8.26668 4.8001 8.52668C4.67526 8.65123 4.60511 8.82033 4.60511 8.99668C4.60511 9.17302 4.67526 9.34212 4.8001 9.46668L6.2001 10.86Z"
                                          fill="#97A6BA"/>
                                </svg>
                                <p>Don’t lose access to your models after deploying them to the Bullsheet cloud.</p>
                            </div>
                            <div>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M12 5.66667H11.3333V4.33333C11.3333 2.49333 9.83996 1 7.99996 1C6.15996 1 4.66663 2.49333 4.66663 4.33333V5.66667H3.99996C3.26663 5.66667 2.66663 6.26667 2.66663 7V13.6667C2.66663 14.4 3.26663 15 3.99996 15H12C12.7333 15 13.3333 14.4 13.3333 13.6667V7C13.3333 6.26667 12.7333 5.66667 12 5.66667ZM7.99996 11.6667C7.26663 11.6667 6.66663 11.0667 6.66663 10.3333C6.66663 9.6 7.26663 9 7.99996 9C8.73329 9 9.33329 9.6 9.33329 10.3333C9.33329 11.0667 8.73329 11.6667 7.99996 11.6667ZM5.99996 4.33333V5.66667H9.99996V4.33333C9.99996 3.22667 9.10663 2.33333 7.99996 2.33333C6.89329 2.33333 5.99996 3.22667 5.99996 4.33333Z"
                                          fill="#97A6BA"/>
                                </svg>
                                <p>Login and keep your prediction projects secure in our infrastructure.</p>
                            </div>
                            <div>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.3333 5.33333C15.3333 6.06667 14.7333 6.66667 14 6.66667C13.88 6.66667 13.7666 6.65333 13.66 6.62L11.2866 8.98667C11.32 9.09333 11.3333 9.21333 11.3333 9.33333C11.3333 10.0667 10.7333 10.6667 9.99996 10.6667C9.26663 10.6667 8.66663 10.0667 8.66663 9.33333C8.66663 9.21333 8.67996 9.09333 8.71329 8.98667L7.01329 7.28667C6.90663 7.32 6.78663 7.33333 6.66663 7.33333C6.54663 7.33333 6.42663 7.32 6.31996 7.28667L3.28663 10.3267C3.31996 10.4333 3.33329 10.5467 3.33329 10.6667C3.33329 11.4 2.73329 12 1.99996 12C1.26663 12 0.666626 11.4 0.666626 10.6667C0.666626 9.93333 1.26663 9.33333 1.99996 9.33333C2.11996 9.33333 2.23329 9.34667 2.33996 9.38L5.37996 6.34667C5.34663 6.24 5.33329 6.12 5.33329 6C5.33329 5.26667 5.93329 4.66667 6.66663 4.66667C7.39996 4.66667 7.99996 5.26667 7.99996 6C7.99996 6.12 7.98663 6.24 7.95329 6.34667L9.65329 8.04667C9.75996 8.01333 9.87996 8 9.99996 8C10.12 8 10.24 8.01333 10.3466 8.04667L12.7133 5.67333C12.68 5.56667 12.6666 5.45333 12.6666 5.33333C12.6666 4.6 13.2666 4 14 4C14.7333 4 15.3333 4.6 15.3333 5.33333Z"
                                        fill="#97A6BA"/>
                                </svg>
                                <p>Get tech and publishing support to Data Visualization & Business Intelligence
                                    tools.</p>
                            </div>
                        </div>
                        <div className="buttons-container">
                            <button>Try pro FREE</button>
                            <button>Not Now. Try another model</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Aligner;