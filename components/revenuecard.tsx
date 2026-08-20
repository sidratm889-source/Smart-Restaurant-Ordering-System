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
        <div className = "grid grid-cols-4 gap-3 rounded-md mt-8">
            <div className = "shadow shadow-black-500/100 w-50 h-30 bg-white rounded-sm flex flex-col rounded-md bg-white ml-10 pt-4 transition-all duration-200 ease-in-out hover:-translate-y-1 border-1  border-transparent hover:border-red-800 ">
          <h2 className = "text-[#1F2937] font-semibold ml-4"> Total Revenue </h2>
          <p className = "text-red-800 ml-6 pt-1 text-2xl"> ${totalRevenue}</p>
            <p className = "text-gray-800 ml-5 pt-3 text-sm"> +12% this month</p>
          </div>
          <div className = "shadow shadow-black-500/100 w-50 h-30 bg-white rounded-sm flex flex-col rounded-md bg-white ml-10 pt-4 transition-all duration-200 ease-in-out hover:-translate-y-1 border-1  border-transparent hover:border-red-800 ">
            <h2 className = "text-[#1F2937] font-semibold ml-4">Active Subscriptions</h2>
            <p className = "text-red-800 ml-5 pt-1 text-2xl" >{active}</p>
            <p className = "text-gray-800 ml-5 pt-2 text-sm"> +1 this month</p>
          </div>
          <div className = "shadow shadow-black-500/100 w-50 h-30 bg-white rounded-sm flex flex-col rounded-md bg-white ml-10 pt-4 transition-all duration-200 ease-in-out hover:-translate-y-1 border-1  border-transparent hover:border-red-800 ">
            <h2 className = "text-[#1F2937] font-semibold ml-4">Suspended</h2>
            <p className = "text-red-800 ml-5 pt-1 text-2xl">{suspended}</p>
                        <p className = "text-gray-800 ml-5 pt-2 text-sm">currently suspended</p>
            </div>
            <div className = "shadow shadow-black-500/100 w-50 h-30 bg-white rounded-sm flex flex-col rounded-md bg-white ml-10 pt-4 transition-all duration-200 ease-in-out hover:-translate-y-1 border-1  border-transparent hover:border-red-800 ">
            <h2 className = "text-[#1F2937] font-semibold ml-4">Free</h2>
            <p className = "text-red-800 ml-5 pt-2 text-2xl">{free}</p>
            </div>

    </div>
    )

}
