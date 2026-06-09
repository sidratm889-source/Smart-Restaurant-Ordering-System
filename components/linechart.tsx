"use client";
import { LineChart as RechartLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type RevenueData = {
    month: string; 
    revenue: number;
}



export const LineChart = ({data}: {data: RevenueData[]}) => {
    return(
        <div className=" w-[950px] w-auto w-full h-[300px] bg-white rounded-lg shadow-md mt-15">
            <h2 className = "mt-2 ml-3">Revenue Overview</h2>
            <ResponsiveContainer width="95%" height="95%">
                <RechartLineChart data={data} margin={{ top: 15, bottom: 8, left: 4, right: 8 }}>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} />
                    <XAxis dataKey="month" interval={0} tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: "gray" }}/>
                    <YAxis tickLine={false} axisLine={{ stroke: "gray" }} domain={[0, "auto"]}/>
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