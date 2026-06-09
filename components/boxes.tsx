


type Row = {
    status: string;
}


export default function boxes({rows}:{rows: Row[]}) {
    const visible = rows.filter((r) =>{
        const s = r.status.toLowerCase();
        return s !== "approved" && s !== "rejected";
    });
    const total = visible.length;
    const active = rows.filter((r) => r.status === "active").length;
    const pending = rows.filter((r) => r.status === "pending").length;
    const suspended = rows.filter((r) => r.status === "suspended").length;
    return (
        <div className = "grid grid-cols-4 gap-5 flex">
            <div className = " ml-10 bg-blue-100 w-50 h-30 rounded-md">
                <h2 className = "text-gray-600 text-1xl mt-3 ml-4">Total Restaurants</h2>
                <p className = "text-black text-3xl mt-2 ml-4">{total}</p>
                <p className = "text-gray-600 text-sm mt-1 ml-4">
                    <span className = "text-red-800">↑ 3</span> this month</p>
            </div>
            <div className = " ml-10 bg-green-100 w-50 h-30 rounded-md">
                <h2 className = "text-gray-600 text-1xl mt-3 ml-4">Active</h2>
                <p className = "text-black text-3xl mt-2 ml-4">{active}</p>
                <p className = "text-gray-600 text-sm mt-1 ml-4">
                    <span className = "text-green-800">↑ 2</span> from last month</p>
            </div>
            <div className = " ml-10 bg-yellow-100  w-50 h-30 rounded-md">
                <h2 className = "text-gray-600 text-1xl mt-3 ml-4">Pending Approval</h2>
                <p className = "text-black text-3xl mt-2 ml-4">{pending}</p>
                <p className = "text-gray-600 text-sm mt-1 ml-4">
                     Awaiting review </p>
            </div>
            <div className = " ml-10 bg-red-100 w-50 h-30 rounded-md">
                <h2 className = "text-gray-600 text-1xl mt-3 ml-4">Suspended </h2>
                <p className = "text-black text-3xl mt-2 ml-4">{suspended}</p>
                <p className = "text-gray-600 text-sm mt-1 ml-4">
                    <span className = "text-red-800">↑ 1 </span>Suspended this week</p>
            </div>


        </div>
    )
}