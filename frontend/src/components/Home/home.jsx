import React, { useState } from "react";
import './home.css'

import engine_status from '../../assets/engine 1.png';
import error from '../../assets/attention-triangle.png';
import no_error from '../../assets/Eo_circle_green_checkmark.svg.png';
import sync from '../../assets/directory_sync_FILL0_wght400_GRAD0_opsz24 1.png';
import car from '../../assets/directions_car_FILL0_wght400_GRAD0_opsz24 1.png';


const HomePage = () => {

    const [iserror, setError] = useState(true);
    const [connect, setConnect] = useState(true);

    const toggleError = () => {
        setError(!iserror);
    };

    const toggleConnect = () => {
        setConnect(!connect);
    };

    return(
        <div className="homePage-container">
            <div className="homePage-row">
                <div className="frow-column">
                    <div className="engine-status">
                        <h1>Engine Status</h1>
                        <div className="engine-state-img">
                            <img src={engine_status} alt="engine status" className="engine" />
                            {iserror ? <img src={error} alt="error " className="error" /> : <img src={no_error} alt="no error " className="error" />}
                        </div>
                        {iserror ? <p className="Error-massage"><span>Urgent Alert!</span> <br />please check your <br /> Engine soon</p> : <p className="no-error">No engine faults</p>}
                    </div>
                    <div className="treads">
                        <p className="current-treads"><img src={sync} alt="sync" />Current Threads</p>
                        <p>Action needed</p>
                        <p>Last scan: 2/2/2024 2.29PM</p>
                        <p>2 threat(s) found</p>
                        <p>Scan lasted 52 seconds</p>
                    </div>

                </div>
                <div className="column">
                    <div className="right-row">
                        {connect ? <p className="connect-btn"><div className="green-dot"></div>Connected</p> : <p className="connect-btn"><div className="red-dot"></div>Disconnected</p>}
                        <img src={car} alt="car" className="car" />
                    </div>
                    <div className="alert-box">

                    </div>
                </div>
            </div>
            <div className="homePage-row">
                <button onClick={toggleConnect}>Connection</button>
                <button onClick={toggleError}>Error</button>
            </div>
        </div>
    )
}

export default HomePage;
