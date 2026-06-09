import {PieChart, Pie,  Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
    {name: "Pro", value: 45},
    {name: "basic", value: 30},
]
const COLORS = ["#7C6CF2","#22C55E",];

export default function DonutChart(){
    return(
        <div className= "mt-15 mb-2">
            <ResponsiveContainer width = "100%" height = {200}>
            <PieChart>
                <Pie data={data} dataKey = "value" innerRadius = {70} outerRadius = {100}>
                    {data.map((entry, index) => (
                        <Cell key = {index}
                        fill = {COLORS[index]}
                    />
                    ))}
                </Pie>

                <Tooltip/>

               
             
            </PieChart>

            </ResponsiveContainer>
            <div className = "mt-0 mb-2">
            <h2 className = "mb-3 mt-3 text-left ml-18"> Subscription Plan</h2>
            <div className = "mt-1  gap-1  items-center ml-35 grid grid-cols-2">
            <div className = "flex items-center gap-1">                 
<div className = "flex rounded-sm w-2 h-2 bg-purple-500 items-center gap-1"></div>
<span>Pro</span>
</div>
<div className = "flex items-center gap-1">
<div className = "flex rounded-sm w-2 h-2 bg-green-500 "></div>
<span>Basic</span>
</div>
</div>
</div>
</div>

       
    )
}