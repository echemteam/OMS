import React from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { generateColorArray } from './ChartTailwindConfig';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function BubbleChart(props) {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display : false,
                position: "top",
            },
            title: {
                display: true,
                // text: "Bubble Chart",
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
        },
        title: {
            display: true,
            // text: "Bubble Chart",
        },
        canvas: {
          // height: props.height || null, // Set canvas height dynamically or use null for default
          // width: props.size || null,   // Set canvas width dynamically or use null for default
        },
    };

    const labels = props.data?.map(entry => entry.label) ?? [];
    const dataValues = props.data?.map(entry => ({
        x: Math.random() * 100, // example x value
        y: Math.random() * 100, // example y value
        r: entry.data // use data as radius
    })) ?? [];

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
                borderWidth: 0,
              },
        ],
    };

    return <Bubble data={data} options={options}
    // width={props.size}

    />;
}

export default BubbleChart;