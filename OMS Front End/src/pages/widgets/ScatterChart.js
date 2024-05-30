import React from 'react';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const generateRandomData = () => {
  const data = Array.from({ length: 100 }, () => ({
    x: Math.floor(Math.random() * 201) - 100, // Random number between -100 and 100
    y: Math.floor(Math.random() * 201) - 100, // Random number between -100 and 100
  }));
  return data;
};

const data = {
  datasets: [
    {
      label: 'A dataset',
      data: generateRandomData(),
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

const ScatterChart = () => {
  return <Scatter options={options} data={data} />;
};

export default ScatterChart;
