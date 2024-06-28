import React from "react";
import BarChart from "../../components/ui/widgets/charts/BarChart";
import BubbleChart from "../../components/ui/widgets/charts/BubbleChart";
import LineChart from "../../components/ui/widgets/charts/LineChart";
import PieChart from "../../components/ui/widgets/charts/PieChart";
import RadarChart from "../../components/ui/widgets/charts/RadarChart";
import HorizontalBarChart from "../../components/ui/widgets/charts/HorizontalBarChart";
import BarChartStacked from "./BarChartStacked";
import DoughnutChart from "../../components/ui/widgets/charts/DoughnutChart";
import ScatterChart from "./ScatterChart";

const Widgets = () => {
  return (
    <div>
      <div className="row">
        <div className="col-4">
          <div className="card">
            <BarChart />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <HorizontalBarChart/>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <BubbleChart/>
          </div>
        </div>

        <div className="col-4">
          <div className="card">
            <BarChartStacked/>
          </div>
        </div>
        
        <div className="col-4">
          <div className="card">
            <LineChart/>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <ScatterChart/>
          </div>
        </div>
        
        <div className="col-4">
          <div className="card">
            <PieChart/>
          </div>
        </div>
        
        <div className="col-4">
          <div className="card">
            <DoughnutChart/>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <RadarChart/>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Widgets;
