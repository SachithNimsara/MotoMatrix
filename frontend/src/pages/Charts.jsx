import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import './Charts.css';
const metrics = ['speed', 'rpm', 'temperature', 'battery', 'fuel_level', 'engine_temperature'];

const ChartComponent = ({ type, metric, title }) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: { id: 'basic-bar' },
      xaxis: { categories: [] }
    },
    series: [{ name: title, data: [] }]
  });

  useEffect(() => {
    fetch(`http://localhost/My_projects/MotoMatrix1/frontend/PHP/get_chart_data.php?type=${type}&metric=${metric}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        setChartData({
          options: { chart: { id: 'basic-bar' }, xaxis: { categories: data.categories } },
          series: [{ name: title, data: data.values }]
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [type, metric, title]);

  return (
    <div>
      <h3>{title}</h3>
      <Chart options={chartData.options} series={chartData.series} type="area" width="500" />
    </div>
  );
};

const Charts = () => {
  const [timeframe, setTimeframe] = useState('daily');

  return (
    <div>
      <div>
        <button onClick={() => setTimeframe('daily')} className='btn'>Daily</button>
        <button onClick={() => setTimeframe('weekly')} className='btn'>Weekly</button>
        <button onClick={() => setTimeframe('monthly')} className='btn'>Monthly</button>
      </div>
      <div className="chart-grid">
        {metrics.map((metric, index) => (
          <ChartComponent
            key={index}
            type={timeframe}
            metric={metric}
            title={metric.charAt(0).toUpperCase() + metric.slice(1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Charts;
