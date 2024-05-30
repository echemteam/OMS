import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateColorArray } from './ChartTailwindConfig';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineChart(props) {
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display:false,
                    position: 'top',
                    labels: {
                        font: {
                            weight: 'bold',
                            size: 14,
                        }
                    }
                },
                title: {
                    display: true,
                    // text: 'Line Chart',
                    font: {
                        weight: 'bold',
                        size: 14,
                    }
                },
            },
        };

    const labels = props.data?.map(entry => entry.label) ?? [];
    const dataValues = props.data?.map(entry => entry.data) ?? [];
    
    const data = {
        labels,
        datasets: [
            {
                label: props.title,
                data: dataValues,
                // backgroundColor: "#FFC107",
                backgroundColor:generateColorArray(dataValues.length),
                barPercentage: 0.50,
                categoryPercentage: 0.50,
                borderWidth: 1,
              },
        ],
    };
    return (
        <Line data={data} options={options}
        />
    );
}

export default LineChart;
