import React, { useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { generateColorArray, tailwindConfig } from './ChartTailwindConfig';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(props) {

    const labels = props.data?.map(entry => entry.label) ?? [];
    const dataValues = props.data?.map(entry => entry.data) ?? [];

    const legend = useRef(null);
    
    const options = {
        responsive: true,

        elements: {
            bar: {
                borderWidth: 0,
            },
            color: "black",
        },
        plugins: {
            legend: {
                display:false,
                position: "bottom",
                labels: {
                    color: "black",
                },
            },
            title: {
                display: true,
                // text: "Vertical Bar Chart",
                color: "black",
            },
        },
        canvas: {
            // height: props.height || null, // Set canvas height dynamically or use null for default
            // width: props.size || null,   // Set canvas width dynamically or use null for default
        },



    };

    const plugins= [
        {
          id: 'htmlLegend',
          afterUpdate(c, args, options) {
            const ul = legend.current;
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            // Reuse the built-in legendItems generator
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item) => {
              const li = document.createElement('li');
              li.style.margin = tailwindConfig().theme.margin[1];
              // Button element
              const button = document.createElement('button');
              button.classList.add('btn-xs', 'bg-white', 'dark:bg-slate-800', 'text-slate-500', 'dark:text-slate-400', 'border', 'border-slate-200', 'dark:border-slate-700', 'shadow-md' , 'new-style');
              button.style.opacity = item.hidden ? '.3' : '';
              button.onclick = () => {
                c.toggleDataVisibility(item.index);
                c.update();
              };
              // Color box
              const box = document.createElement('span');
              box.style.display = 'block';
              box.style.width = tailwindConfig().theme.width[2];
              box.style.height = tailwindConfig().theme.height[2];
              box.style.backgroundColor = item.fillStyle;
              box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
              box.style.marginRight = tailwindConfig().theme.margin[1];
              box.style.pointerEvents = 'none';
              // Label
              const label = document.createElement('span');
              label.style.display = 'flex';
              label.style.alignItems = 'center';
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          },
        },
      ]

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
                borderWidth: 3,
            },
        ],
    };


    return (
        <div className="height-width-canvas">
            <Pie data={data} options={options} plugins={plugins}
            // width={props.size}
            />
              <div className="px-5 pt-2 pb-6">
                <ul ref={legend} className="flex flex-wrap justify-center -m-1"></ul>
            </div>
        </div>
    );
}

export default PieChart;
