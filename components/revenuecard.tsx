import { Rows } from "lucide-react";
import type { subscriptionTableRow } from "./subscriptionTable";

type props = {
  rows: subscriptionTableRow[]
  totalRevenue: number;
}


export default  function RevenueCard({ rows, totalRevenue }: props) {
const active = rows.filter((r) => r.status === "active").length;
const suspended = rows.filter((r) => r.status === "suspended").length;
const free = rows.filter((r) => r.amount == 0).length;


    return(
        <div className = "grid grid-cols-4 gap-3 rounded-md">
            <div className = "w-50 h-20 bg-white ">
          <h2> Total Revenue </h2>
          <p className = "text-sm text-gray-500"> ${totalRevenue}</p>
          </div>
          <div className = "w-50 h-20 bg-white">
            <h2>Active Subscriptions</h2>
            <p className = "text-sm text-gray-500" >{active}</p>
          </div>
          <div className = "w-50 h-20 bg-white">
            <h2>Suspended</h2>
            <p className = "text-sm text-gray-500">{suspended}</p>
            </div>
            <div className = "w-50 h-20 bg-white">
            <h2>Free</h2>
            <p className = "text-sm text-gray-500">{free}</p>
            </div>

    </div>
    )

}
