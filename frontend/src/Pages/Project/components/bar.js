import {React,useState} from 'react'
import {Line} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import {CategoryScale} from 'chart.js'; 
import {registerables} from 'chart.js';
import axios from "axios";

const BarChart = (PROPS) => {
  console.log({L:PROPS.PROPS})
  
// const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
// const [data, setData] = useState({
//     labels: ['14:31:18', '14:31:43', '14:32:08', '14:31:33', '14:31:58', '14:32:23'],
//     datasets: [
//       {
//         //this lable will be header name
//         label: "Controller1_pv",
//         data: [32.2, 31.3, 32.1, 31.7, 32, 31.4, 31.8],
//         fill: true,
//         backgroundColor: "rgba(70,192,192,0.2)",
//         borderColor: "rgba(75,192,192,1)"
//       },
//       {
//         //this lable will be header name
//         label: "Controller1_sv",
//         data: [10, 20, 4, 32, 18, 42],
//         fill: false,
//         borderColor: "#742774"
//       }
//     ]
// })

// setTimeout(()=>{
//   setData(PROPS.PROPS)
// }, )

// let time = [`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`]

  Chart.register(CategoryScale);
  Chart.register(ArcElement);
  Chart.register(...registerables);

//   useEffect(()=>{
//   setData(PROPS.PROPS);
//   let DataSet = [0];

//   //more PROPS means more updated values

//   console.log("inside", PROPS.PROPS)
//   if(!PROPS.PROPS.length || PROPS.PROPS.length <= 1) {
//     Label[0] = PROPS.PROPS.Timed;
//     DataSet[0] = PROPS.PROPS.Devices
//     setDataset(DataSet)
//     console.log("single", DataSet);
//   }
  
//   else{

//     PROPS.PROPS.forEach((value, key) => {
//       console.log(value.Devices)
//       value.Devices.forEach((VAL, KEY) => {
//         DataSet[key] = {
//           label: VAL.Header,
//           data: VAL.val,
//           backgroundColor: "rgba(75,192,192,0.2)",
//           borderColor: "rgba(75,192,192,1)"
//         };
//       })
      
//     })

//     setDataset(DataSet);
//     console.log(DataSet);
    
//     PROPS.PROPS.forEach((value, key) => {
//       Label[key] = `${value.Timed.split(",")[3]}:${value.Timed.split(",")[4]}:${value.Timed.split(",")[5]}`;
//     });
    
//     setLabel(Label);
//   }

//   console.log(Label);
//         setData({
//           //lables will be times values
//           labels: Label,
//           datasets: [
//             {
//               //this lable will be header name
//               label: "first header",
//               data: [10, 180],
//               fill: true,
//               backgroundColor: "rgba(75,192,192,0.2)",
//               borderColor: "rgba(75,192,192,1)"
//             },
//             {
//               //this lable will be header name
//               label: "second header",
//               data: [200, 123],
//               fill: false,
//               borderColor: "#742774"
//             }
//           ]

//         })
//         console.log(Label);
// }, [PROPS])
  return (

      <Line id='grid'
        data={PROPS.PROPS}
        width="70%"
        height="40%"
      />

  )
}

export default BarChart