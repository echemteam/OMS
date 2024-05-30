import React from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const generateRandomData = () => {
  return Array.from({ length: 50 }, () => ({
    x: Math.floor(Math.random() * 201) - 100,
    y: Math.floor(Math.random() * 201) - 100,
    r: Math.floor(Math.random() * 16) + 5,
  }));
};

const data = {
  datasets: [
    {
      label: 'Red dataset',
      data: generateRandomData(),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Blue dataset',
      data: generateRandomData(),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const BubbleChart = () => {
  return <Bubble options={options} data={data} />;
};

export default BubbleChart;
