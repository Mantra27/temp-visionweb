import {React,useState, useEffect} from 'react'
import {Doughnut, Pie, Line} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import {CategoryScale} from 'chart.js'; 
import {registerables} from 'chart.js';
import axios from "axios";

const BarChart = (PROPS) => {

  
  const [data, setData] = useState(PROPS.PROPS)
  Chart.register(CategoryScale);
  Chart.register(ArcElement);
  Chart.register(...registerables);

  
  useEffect(() => {
    setTimeout(() => {
      setData({
        //lables will be times values
        labels: ["lamb", "thermo"],
        datasets: [
          {
            //this lable will be header name
            label: "first header",
            data: [10, 180],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            //this lable will be header name
            label: "second header",
            data: [200, 123],
            fill: false,
            borderColor: "#742774"
          }
        ]
      })
    }, 1000);
  }, [])

  return (

      <Line
        data={data}
        width="70%"
        height="40%"
      />

  )
}

export default BarChart