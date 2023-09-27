import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const Graph = (props) => {
  const config = {
    data: {
      datasets: [
        {
          data: [props.expense, props.saving],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)"],
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };
  return (
    <div className="flex ">
      <div className="item">
        <div className="chart relative">
          <Doughnut {...config}></Doughnut>
          <h3 className="absolute left-28 right-0 top-28 mb-4 ml-auto mr-auto font-bold">
            Total
            <span className="block text-3xl text-emerald-400">
              {" "}
              {"\u20B9 "}
              {props.value}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Graph;
