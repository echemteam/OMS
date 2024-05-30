import React, { useRef } from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { generateColorArray } from "./ChartTailwindConfig";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

function RadarChart(props) {
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
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                // barPercentage: 0.50,
                // categoryPercentage: 0.50,
                borderWidth: 0,
            },
        ],
    };


    const options = {
        responsive: true,

        elements: {
            bar: {
                borderWidth: 0,
            },
            color: "#64748b",
        },
        plugins: {
            legend: {
                display: false,
                // position: "bottom",
                labels: {
                    color: "#64748b",
                    font: {
                        weight: 'bold',
                        size: 14,
                    }
                },
            },
            title: {
                display: false,
                // text: "Vertical Bar Chart",
                color: "#64748b",
                font: {
                    weight: 'bold',
                    size: 14,
                }
            },
        },
        canvas: {
            // height: props.height || null, // Set canvas height dynamically or use null for default
            // width: props.size || null,   // Set canvas width dynamically or use null for default
        },

    };

    return (
        <div className="radar-chart-sec">
            <Radar options={options} data={data}
            // width={props.size}
            />
        </div>
    );
}

export default RadarChart;
