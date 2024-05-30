import React from "react";
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
import { generateColorArray } from "./ChartTailwindConfig";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = (props) => {
    const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                fontColor: "#64748b",
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
                fontColor: "#64748b",
                display: true,
                // text: 'Horizontal Bar Chart',
                font: {
                    weight: 'bold',
                    size: 14,
                }
            },
        },
    };

    // Extracting labels and data from the array of objects
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
        // width={props.size} 
        />
    );
}

export default BarChart;
