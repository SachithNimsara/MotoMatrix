import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import engine_status from '../../assets/engine 1.png';
import error from '../../assets/attention-triangle.png';
import no_error from '../../assets/Eo_circle_green_checkmark.svg.png';
import sync from '../../assets/directory_sync_FILL0_wght400_GRAD0_opsz24 1.png';
import car from '../../assets/directions_car_FILL0_wght400_GRAD0_opsz24 1.png';
import map from '../../assets/Map_view 1.png';
import real_time from '../../assets/Real_time 1.png';
import Error_preventer from '../../assets/event.png';
import engine_fault from '../../assets/large_check-engine 1.png';
import analysis from '../../assets/pngtree-data-rise-analysis-graph-illustration-png-image_4639368 1.png';
import EngineFaults from '../../pages/EngineFaults';  // Ensure this path is correct
import { database } from '../../pages/firebase';  // Import the correct export from firebase.js
import { ref, onValue } from 'firebase/database';

const HomePage = () => {
    const [isError, setIsError] = useState(false);
    const [isConnected, setIsConnected] = useState(true);
    const [faultData, setFaultData] = useState([]);
    const [carPositionMessage, setCarPositionMessage] = useState('');
    const [shockSensorData, setShockSensorData] = useState(0);
    const [shockSensorMessage, setShockSensorMessage] = useState('');

    useEffect(() => {
        setupFirebaseListener(); // Start listening to Firebase updates
    }, []);

    const toggleConnect = () => {
        setIsConnected(!isConnected);
    };

    const handleFaultsChange = (newFaultData) => {
        setFaultData(newFaultData);
        setIsError(newFaultData.length > 0);
    };

    const setupFirebaseListener = () => {
        const carPositionRef = ref(database, 'MPU-6050 READ');
        const shockSensorRef = ref(database, 'SW-420 MODULE READ');

        onValue(carPositionRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data['Accel data'] && data['Gyro data']) {
                const accel = data['Accel data'];
                const gyro = data['Gyro data'];
                updateCarPositionMessage(accel, gyro);
            }
        });

        onValue(shockSensorRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setShockSensorData(data);
                // Example of a simple message based on the shock sensor data
                if (data > 0) {
                    setShockSensorMessage('⚠️ Shock detected ');
                } else {
                    setShockSensorMessage('No shocks detected!.');
                }
            }
        });
    };

    const updateCarPositionMessage = (accel, gyro) => {
        const { X: accelX, Y: accelY, Z: accelZ } = accel;
        const { X: gyroX, Y: gyroY, Z: gyroZ } = gyro;

        let newMessage = 'Car is ';

        if (Math.abs(accelY) < 2 && Math.abs(accelX) < 2) {
            newMessage += 'level (parallel to Earth). ';
        } else {
            if (accelY < -2) {
                newMessage += 'tilted forward. ';
            } else if (accelY > 2) {
                newMessage += 'tilted backward. ';
            }

            if (accelX < -2) {
                newMessage += 'tilted left. ';
            } else if (accelX > 2) {
                newMessage += 'tilted right. ';
            }
        }

        if (Math.abs(gyroX) < 0.5 && Math.abs(gyroY) < 0.5 && Math.abs(gyroZ) < 0.5) {
            newMessage += 'Facing North.';
        } else {
            if (gyroX > 0.5) {
                newMessage += 'Facing East.';
            } else if (gyroX < -0.5) {
                newMessage += 'Facing West.';
            } else if (gyroY > 0.5) {
                newMessage += 'Facing South.';
            } else if (gyroY < -0.5) {
                newMessage += 'Facing South.';
            } else {
                newMessage += 'Facing North.';
            }
        }

        setCarPositionMessage(newMessage);
    };

    return (
        <div className="homePage-container">
            <div className="homePage-row">
                <div className="frow-column">
                    <div className="engine-status">
                        <h1>Engine Status</h1>
                        <div className="engine-state-img">
                            <img src={engine_status} alt="engine status" className="engine" />
                            <img src={isError ? error : no_error} alt={isError ? "error" : "no error"} className="error" />
                        </div>
                        <p className={isError ? "error-message" : "no-error"}>
                            {isError ? (
                                <>
                                    <span>Urgent Alert!</span><br />
                                    Please check your <br /> Engine soon
                                </>
                            ) : (
                                "No engine faults"
                            )}
                        </p>
                    </div>
                    <div className="treads">
                        <p className="current-treads">
                            <img src={sync} alt="sync" />
                            Current Threads
                        </p>
                        <div>
                            <p className="car-position">
                                Car Position:<br />
                                {carPositionMessage}
                            </p>
                            <p className="shock-sensor">
                                Shock Details:<br />
                                {shockSensorMessage}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="right-row">
                        <p className="connect-btn">
                            <div className={isConnected ? "green-dot" : "red-dot"}></div>
                            {isConnected ? "Connected" : "Disconnected"}
                        </p>
                        <img src={car} alt="car" className="car" />
                    </div>
                </div>
            </div>
            <div className="homePage-row bottom">
                <Link to="/EngineData" className="feature-link">
                    <Feature icon={real_time} label="RealTime Information" />
                </Link>
                <Link to="/chart" className="feature-link">
                    <Feature icon={analysis} label="Analysis" />
                </Link>
                <Link to="/EngineFaults" className="feature-link">
                    <Feature icon={engine_fault} label="Engine Faults" />
                </Link>
                <Link to="/GpsTracker" className="feature-link">
                    <Feature icon={map} label="Map view" />
                </Link>
                <Link to="/ErrorPrevent" className="feature-link">
                    <Feature icon={Error_preventer} label="Error Preventer" />
                </Link>
            </div>
            <button className="hide" onClick={toggleConnect}></button>
            <EngineFaults onFaultsChange={handleFaultsChange} showWarnings={false} />
        </div>
    );
};

const Feature = ({ icon, label }) => (
    <div className="feature-container">
        <img src={icon} alt={label} />
        <p>{label}</p>
    </div>
);

export default HomePage;
