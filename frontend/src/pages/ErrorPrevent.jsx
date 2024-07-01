import React, { useState, useEffect } from 'react';
import './ErrorPrevent.css';
import engineIcon from '../../src/assets/attention-triangle.png';

const ErrorPrevent = () => {
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({ what: false, action: false });

  useEffect(() => {
    console.log('Fetching data...');
    fetch('http://localhost/My_projects/MotoMatrix1/frontend/PHP/get_error_prevent.php')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data:', data);
        setError(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!error) {
    return <div>Loading...</div>;
  }

  const toggleExpand = (section) => {
    setExpanded({ ...expanded, [section]: !expanded[section] });
  };

  return (
    <div className="error-preventing">
      <h2>ERROR PREVENTING</h2>
      <p>{error.date}</p>
      <p>{error.threats} threat(s) found</p>
      <div className="warning">
        <img src={engineIcon} alt="Engine Icon" className="engine-icon" />
        <span className="warning-title">{error.title}</span>
      </div>
      <div className="issue">
        <div className="issue-section" onClick={() => toggleExpand('what')}>
          <h4>What Is Happening? <span className="expand-symbol">{expanded.what ? '˅' : '^'}</span></h4>
          {expanded.what && <p>{error.issue_what}</p>}
        </div>
        <div className="issue-section" onClick={() => toggleExpand('action')}>
          <h4>What Should I Do? <span className="expand-symbol">{expanded.action ? '˅' : '^'}</span></h4>
          {expanded.action && <p>{error.issue_action}</p>}
        </div>
      </div>
    </div>
  );
};

export default ErrorPrevent;
