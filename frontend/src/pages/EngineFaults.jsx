import React, { useState, useEffect } from 'react';
import './EngineFaults.css';

const EngineFaults = ({ onFaultsChange, showWarnings = true }) => {
  const [faults, setFaults] = useState([]);
  const [expandedFault, setExpandedFault] = useState(null);

  useEffect(() => {
    fetch('http://localhost/My_projects/MotoMatrix1/frontend/PHP/get_engine_faults.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error); // Handle server-side errors
        }
        setFaults(data);
        onFaultsChange(data); // Ensure this callback is called correctly
      })
      .catch(error => console.error('Error fetching data:', error)); // Log fetch errors
  }, [onFaultsChange]);

  const toggleFaultDetails = (index) => {
    setExpandedFault(index === expandedFault ? null : index);
  };

  return (
    <div className="engine-faults">
      {showWarnings && (
        <div className="header">
          <div className="warning">
            <div className="warning-icon">⚠️</div>
            <div>
              <h2>Warning!</h2>
              <p>{faults.length} fault code(s) found</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
      {showWarnings && (
        <div className="fault-codes">
          <h3>Confirmed fault code ({faults.length})</h3>
          {faults.map((fault, index) => (
            <div key={index} className="fault" onClick={() => toggleFaultDetails(index)}>
              <h4>{fault.code} <span className="expand-symbol">{expandedFault === index ? '˅' : '^'}</span></h4>
              {expandedFault === index && <p className="alert-message">{fault.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EngineFaults;
