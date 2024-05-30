import React, { useRef } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { generateColorArray, tailwindConfig } from "./ChartTailwindConfig";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = (props) => {
    const legend = useRef(null);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
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
                // text: 'Vertical Bar Chart',
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
                backgroundColor: generateColorArray(dataValues.length),
                barPercentage: 0.50,
                categoryPercentage: 0.50,
                borderWidth: 0,
              },
        ],
    };

    return (
        <Bar data={data} options={options} 
        />
    );
};

export default BarChart;
