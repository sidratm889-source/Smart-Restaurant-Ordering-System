

type Row = {
    status: string;

}



export default function SubscriptionCard({rows = []}: {rows?: Row[]}){
    const visible = rows.filter((r) =>{
        const s = r.status.toLowerCase();
       return s !== "approved" && s !== "rejected";
    });
    const total = visible.length;
    const active  = rows.filter((r) => r.status === "active").length;
    const pending = rows.filter((r) => r.status === "pending").length;
    const suspended = rows.filter((r) => r.status === "Suspended").length;

    return(
        <div className = "grid grid-cols-4 gap-10 mt-8">
            <div style={{ fontFamily: 'Poppins, sans-serif' }}  className = "shadow shadow-black-500/100 flex flex-col rounded-md bg-white w-50 h-30 ml-10 pt-4 transition-all duration-200 ease-in-out hover:-translate-y-1 border-1  border-transparent hover:border-red-800 ">
                <h1 className = "text-[#1F2937]  ml-4">Total subscriptions</h1>
                <p className = "text-red-800 ml-5 pt-2 text-2xl">{total}</p>
                <p className = "text-sm text-gray-500  ml-5 pt-1"> +12 this 1 month</p>
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif' }}  className = "shadow shadow-black-500/100 flex flex-col rounded-md bg-white w-50 h-30 ml-10 pt-4 transition-all duration-200 ease-in-out hover:-translate-y-1 border-1  border-transparent hover:border-red-800 ">
                <h1 className = "text-[#1F2937]  ml-4">Pending subscriptions</h1>
                <p className = "text-red-800 ml-5 pt-2 text-2xl">{pending}</p>
                <p className = "text-sm text-gray-500 ml-4 pt-1">awaiting admin approval</p>
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif' }}  className = "shadow shadow-black-500/100 flex flex-col rounded-md bg-white w-50 h-30 ml-10 pt-4 transition-all duration-200 ease-in-out hover:-translate-y-1 border-1  border-transparent hover:border-red-800 ">
            <h1 className = "text-[#1F2937]  ml-4">Active subscriptions</h1>
                <p className = "text-red-800 ml-5 pt-2 text-2xl">{active}</p>
                <p className = "text-sm text-gray-500  ml-5 pt-1">currently active plans</p>
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif' }}  className = "shadow shadow-black-500/100 flex flex-col rounded-md bg-white w-50 h-30 ml-10 pt-4 transition-all duration-200 ease-in-out hover:-translate-y-1 border-1  border-transparent hover:border-red-800 ">
            <h1 className = "text-[#1F2937]  ml-3">Suspended subscriptions</h1>
                <p className = "text-red-800 ml-5 pt-2 text-2xl">{suspended}</p>
                <p className = "text-sm text-gray-500  ml-5 pt-1">temporarily suspended</p>
            </div>

        </div>
    )
}