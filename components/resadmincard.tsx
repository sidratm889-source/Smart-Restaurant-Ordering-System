



export default function ResAdminCard() {
    return(
        <main className = "flex-1 p-6 mt-2">
        <div className = "grid grid-cols-4 gap-4">
        <div className = "bg-gray-200 rounded-md h-25 w-50 ">
            <h2 className = "pt-2 text-1xl font-bold">Total Orders</h2>
            <p className = "text-1xl text-gray-500">150</p>

        </div>
         <div className = "bg-gray-200 rounded-md h-25 w-50 ">
            <h2 className = "pt-2 text-1xl font-bold">Total Revenue</h2>
            <p className = "text-1xl text-gray-500">$2898</p>
            
        </div>
         <div className = "bg-gray-200 rounded-md h-25 w-50">
            <h2 className = "pt-2 text-1xl font-bold">Today Orders</h2>
            <p className = "text-1xl text-gray-500">50</p>
            
        </div>
         <div className = "bg-gray-200 rounded-md h-25 w-50 ">
            <h2 className = "pt-2 text-1xl font-bold">Total Staff</h2>
            <p className = "text-1xl text-gray-500">15</p>
            
        </div>
        </div>
        </main>
    )
}