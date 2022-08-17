import {React,useState, useEffect} from 'react'
import {Doughnut, Pie, Line} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import {CategoryScale} from 'chart.js'; 
import {registerables} from 'chart.js';
import axios from "axios";

const BarChart = () => {

  Chart.register(CategoryScale);
  Chart.register(ArcElement);
  Chart.register(...registerables);

  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  })
  useEffect(() => {
    setTimeout(() => {
      setData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "First dataset",
          data: [33, 53, 85, 41, 44, 65],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        },
        {
          label: "Second dataset",
          data: [data.datasets[1].data[0]+10, data.datasets[1].data[1]+10, data.datasets[1].data[2]+10, data.datasets[1].data[3]+10, data.datasets[1].data[4]+10, data.datasets[1].data[5]+1],
          fill: false,
          borderColor: "#742774"
        }
      ]
    })
    }, 1000);
  }, [])

  return (
    <div>
      <Line
        data={data}
      />
    </div>
  )
}

export default BarChart