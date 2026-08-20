"use client";
import { LineChart as RechartLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type RevenueData = {
    month: string; 
    revenue: number;
    
};



export const LineChart = ({data, compact = false,}: {data: RevenueData[]; compact?: boolean;}) => {
    return(
        <div className=" w-[950px] w-auto w-full h-[300px] bg-white rounded-lg shadow-lg mt-15 ">
            <h2 style={{ fontFamily: 'Poppins, sans-serif' }} className = "mt-2 ml-3">Revenue Overview</h2>
            <ResponsiveContainer width="95%" height="95%">
                <RechartLineChart data={data}   margin={{ top: 15, bottom: 8, left: 4, right: 8 }}>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} />
                    <XAxis dataKey="month"
  interval={compact ? 1 : 0}
  tick={{ fontSize: compact ? 10 : 12 }}
  tickFormatter={(value) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const parts = value.split(" ");
    const monthNumber = Number(parts[1]);
    const year = parts[2]?.slice(-2);

    if (compact) {
      // Dashboard
      return `${months[monthNumber - 1]} ${year}`;
    }

    // Revenue Page
    return `${months[monthNumber - 1]} 20${year}`;
  }}
  tickLine={false}
  axisLine={{ stroke: "gray" }}/>
                    <YAxis tickLine={false}  axisLine={{ stroke: "gray" }} domain={[0, "auto"]}/>
                    <Tooltip
                        cursor={{ stroke: "#7C6CF2", strokeWidth: 1, strokeDasharray: "4 4" }}
                        contentStyle={{
                            borderRadius: "16px",
                            border: "none",
                            backgroundColor: "#fff",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                            padding: "10px 14px",
                        }}
                        wrapperStyle={{ outline: "none" }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#7C6CF2" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} /> 
                </RechartLineChart>    

            </ResponsiveContainer>
        

        </div>
    )
}