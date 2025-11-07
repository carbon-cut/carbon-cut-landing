"use client"
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


type Props = {
    data: {
        color: string;
        name: string;
        value: number;
        tons: number;
    }[];
    isAnimating: boolean
} 
function Categorisation({data, isAnimating}: Props) {

  const CustomTooltip: React.FC<{active: boolean, payload: {name: string, value: number}[]}> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-light text-sm text-foreground">{payload[0].name}</p>
          <p className="font-light text-sm text-gray-600">{payload[0].value}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="mb-20">
            <h2 className="text-3xl font-light text-foreground mb-10 tracking-tight">Breakdown by Category</h2>

            <div className="bg-white rounded-2xl border border-[#E0F2F1] p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
              <div></div>
            </div>

           
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border-2"
                  style={{ borderColor: item.color + "30", backgroundColor: item.color + "10" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-light text-sm text-foreground">{item.name}</span>
                  </div>
                  <p className="font-light text-xl" style={{ color: item.color }}>
                    {item.tons.toFixed(2)} t
                  </p>
                  <p className="font-light text-xs text-gray-500">{item.value}%</p>
                </div>
              ))}
            </div>
          </div>
  )
}

/* function DasFunc (){
  const [R, setR] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    import("recharts")
      .then((mod) => {
        console.log("recharts module keys:", Object.keys(mod));
        // also dump potentially problematic nested exports
        if (mounted) setR(mod);
      })
      .catch((e) => {
        console.error("failed to dynamic-import recharts", e);
        if (mounted) setErr(String(e));
      });
    return () => { mounted = false; };
  }, []);

  if (err) {
    return (
      <div className="mb-20">
        <h2 className="text-3xl font-light text-foreground mb-10 tracking-tight">Breakdown by Category</h2>
        <div className="bg-white p-8 rounded-2xl border border-[#E0F2F1]">
          <p className="text-sm text-red-600">Chart failed to load: {err}</p>
        </div>
      </div>
    );
  }

  if (!R) {
    return <div className="mb-20">Loading chart…</div>;
  }
  else return <></>
  
} */

export default Categorisation