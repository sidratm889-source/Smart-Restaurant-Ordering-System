

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
        <div className = "grid grid-cols-4 gap-10">
            <div className = "flex flex-col rounded-md bg-white w-50 h-20 ml-10">
                <h1 className = "text-gray-500">Total subscriptions</h1>
                <p className = "text-black">{total}</p>
                <p className = "text-green-500"> +2 this 1 month</p>
            </div>
            <div className = "flex flex-col rounded-md bg-white w-50 h-20 ml-10">
                <h1 className = "text-gray-500">Pending subscriptions</h1>
                <p className = "text-black">{pending}</p>
                <p className = "text-green-500"> +2 this 1 month</p>
            </div>
            <div className = "flex flex-col rounded-md bg-white w-50 h-20 ml-10">
            <h1 className = "text-gray-500">Active subscriptions</h1>
                <p className = "text-black">{active}</p>
                <p className = "text-green-500"> +2 this 1 month</p>
            </div>
            <div className = "flex flex-col rounded-md bg-white w-50 h-20 ml-10">
            <h1 className = "text-gray-500">Suspended subscriptions</h1>
                <p className = "text-black">{suspended}</p>
                <p className = "text-green-500"> +2 this 1 month</p>
            </div>

        </div>
    )
}