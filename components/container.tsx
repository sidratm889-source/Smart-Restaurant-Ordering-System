import { Rows } from "lucide-react";
import type { subscriptionTableRow } from "./subscriptionTable";
import boxes from "./boxes";
import RevenueCard from "./revenuecard";

type Row = {
    status: string;
};
type props = {
    rows: subscriptionTableRow[]
    totalRevenue: number;
};
export default function Container({rows = [], totalRevenue}: props){
    const visible = rows.filter((r) =>{
        const s = r.status.toLowerCase();
        return s !== "approved" && s !== "rejected";
    });
    const total = visible.length;
const active = rows.filter((r) => r.status.toLowerCase() === "active").length;
    return(   
      <div>
        <h2 className = "dash-h1">Dashboard</h2>
<div className = "mt-20 grid grid-cols-4 gap-10">
  
    <div className = "card">
        <h2 className = "con-h1">Total Restaurants</h2>
        <p className = "con-para">{total}</p>
        <p className = "con-p">↑ +2 this week</p>
    </div>
    <div className = "card">
        <h2 className = "con-h1">Active Restaurants</h2>
        <p className = "con-para">{active}</p>
        <p className = "con-p">5 suspended</p>
    </div>
    <div className = "card">
        <h2 className = "con-h1">Total Subscription</h2>
        <p className = "con-para">{total}</p>
        <p className = "con-p"> ↑ +18% vs yesterday</p>
    </div> 
    <div className = "card">
        <h2 className = "con-h1">Platform Revenue</h2>
        <p className = "con-para">${totalRevenue}</p>
        <p className = "con-p"> ↑ +12% this month</p>
    </div>   
    </div>
    </div> 
  
    )
}

