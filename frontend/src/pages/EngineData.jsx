import React, { useEffect, useState } from 'react';
import './EngineData.css';

const colors = [
  { main: 'rgb(238, 61, 61)', shadow: 'rgba(238, 61, 61, 0.8)' },
  { main: 'rgb(234, 126, 61)', shadow: 'rgba(234, 126, 61, 0.8)' },
  { main: 'rgb(238, 234, 61)', shadow: 'rgba(238, 234, 61, 0.8)' },
  { main: 'rgb(126, 234, 61)', shadow: 'rgba(126, 234, 61, 0.8)' },
  { main: 'rgb(61, 238, 123)', shadow: 'rgba(61, 238, 123, 0.8)' },
  { main: 'rgb(61, 177, 238)', shadow: 'rgba(61, 177, 238, 0.8)' },
];

export default function EngineData() {
  const [speedometerData, setSpeedometerData] = useState([]);

  useEffect(() => {
    fetch('http://localhost/My_projects/MotoMatrix1/frontend/PHP/get_real_time_data.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setSpeedometerData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    speedometerData.forEach((data, index) => {
      const rating = document.getElementsByClassName('rating')[index];

      for (let i = 1; i < 100; i++) {
        const block = document.createElement('div');
        block.className = 'block';
        block.style.transform = `rotate(${3.6 * i}deg)`;
        block.style.animationDelay = `${i / 40}s`;
        rating.appendChild(block);
      }

      const counter = document.querySelectorAll('.counter')[index];
      counter.innerText = 0;
      const target = +counter.getAttribute('data-target');

      const numberCounter = () => {
        const value = +counter.innerText;
        if (value < target) {
          counter.innerText = Math.ceil(value + (target / 100));
          setTimeout(numberCounter, 25);
        }
      };

      numberCounter();

      const blocks = rating.getElementsByClassName('block');
      const color = colors[index % colors.length];
      for (let i = 0; i < blocks.length; i++) {
        if (i < (data.type === 'percentage' ? data.value : data.value / 100)) {
          blocks[i].classList.add('filled');
          blocks[i].style.background = color.main;
          blocks[i].style.boxShadow = `0 0 15px ${color.shadow}, 0 0 30px ${color.shadow}`;
        }
      }
    });
  }, [speedometerData]);

  return (
    <div className='body'>
      <div className='row'>
        {speedometerData.slice(0, 3).map((data, index) => (
          <div className='card' key={index}>
            <div className='rating'>
              <h2>
                <span className="counter" data-target={data.value}>0</span>
                <sup>{data.unit}</sup>
                <br />
                {data.label}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className='row'>
        {speedometerData.slice(3).map((data, index) => (
          <div className='card' key={index + 3}>
            <div className='rating'>
              <h2>
                <span className="counter" data-target={data.value}>0</span>
                <sup>{data.unit}</sup>
                <br />
                {data.label}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
