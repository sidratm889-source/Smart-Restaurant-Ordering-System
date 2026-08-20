


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
        <div className = "grid grid-cols-4 gap-5 flex mt-15 ">
            <div style={{ fontFamily: 'Poppins, sans-serif' }} className = "shadow shadow-black-500/100 ml-10 bg-white w-50 h-30 rounded-md transition-all duration-200 ease-in-out hover:-translate-y-1 border-1  border-transparent hover:border-red-800 ">
                <h2 className = "text-[#1F2937]  text-1xl mt-3 ml-4">Total Restaurants</h2>
                <p className = "text-red-800 text-2xl mt-2 ml-4">{total}</p>
                <p className = "text-gray-600 text-sm mt-1 ml-4">
                    <span className = "text-red-800">↑ 3</span> this month</p>
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif' }} className = "shadow shadow-black-500/100 ml-10 bg-white w-50 h-30 rounded-md transition-all duration-200 ease-in-out hover:-translate-y-1 border-1  border-transparent hover:border-red-800 ">
                <h2 className = "text-[#1F2937]  text-1xl mt-3 ml-4">Active</h2>
                <p className = "text-red-800 text-3xl mt-2 ml-4">{active}</p>
                <p className = "text-gray-600 text-sm mt-1 ml-4">
                    <span className = "text-green-800">↑ 2</span> from last month</p>
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif' }} className = "shadow shadow-black-500/100 ml-10 bg-white  w-50 h-30 rounded-md transition-all duration-200 ease-in-out hover:-translate-y-1 border-1  border-transparent hover:border-red-800 ">
                <h2 className = "text-[#1F2937] text-1xl mt-3 ml-4">Pending Approval</h2>
                <p className = "text-red-800 text-3xl mt-2 ml-4">{pending}</p>
                <p className = "text-gray-600 text-sm mt-1 ml-4">
                     Awaiting review </p>
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif' }} className = " shadow shadow-black-500/100 ml-10 bg-white w-50 h-30 rounded-md transition-all duration-200 ease-in-out hover:-translate-y-1 border-1  border-transparent hover:border-red-800 ">
                <h2 className = "text-[#1F2937] text-1xl mt-3 ml-4">Suspended </h2>
                <p className = "text-red-800 text-3xl mt-2 ml-4">{suspended}</p>
                <p className = "text-gray-600 text-sm mt-1 ml-4">
                    <span className = "text-red-800">↑ 1 </span>Suspended this week</p>
            </div>


        </div>
    )
}