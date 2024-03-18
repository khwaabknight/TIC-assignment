import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";


function Analytics() {
  const {token} = useSelector((state:RootState) => state.auth);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/analytics/admin`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data.data)
      setGraphData(response.data.data);
    })
    .catch(error => {
      console.error("Error fetching analytics:", error);
    })
  }, [token]);


  return (
    <div>
      <div className="w-11/12 max-w-7xl mx-auto bg-slate-50 min-h-[90dvh] shadow-lg p-5">
        <div className="mb-8">
          <h2 className="ml-10 text-3xl text-slate-500 mb-10">Analytics</h2>

          <div className="border-2 rounded-lg p-5 flex flex-col gap-10 md:w-2/3 sm:w-1/2 w-10/12 mx-auto">
            {
              graphData.map((data:any) => (
                <div className="flex md:flex-row flex-col justify-around">
                  <div className="text-lg text-slate-500">
                    <p>Total sales in {data.name} : {data.sales}</p>
                  </div>
                  <div className="text-md text-slate-500">
                    <p>Total successful orders in {data.name} : {data.orders}</p>
                  </div>
                </div>
              ))
            }
            
          </div>
          


        </div>

        <div className="flex sm:flex-row flex-col justify-around items-center gap-5">
          <BarChart width={300} height={200} data={graphData} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
          <BarChart width={300} height={200}  data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  )
}

export default Analytics