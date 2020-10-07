import React, { FunctionComponent } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

type FormComponentProps = {
  title: string;
  type: string;
  labels: any;
  dataLabels: any;
};

const Chart: FunctionComponent<FormComponentProps> = ({ title, type, labels, dataLabels }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#3498db",
        borderColor: "white",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataLabels
      }
    ]
  };
  return (
    <div>
      {type === "bar" && <Bar data={data} />}
      {type === "doughnut" && <Doughnut data={data} />}
    </div>
  );
};

export default Chart;
