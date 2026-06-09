import React from "react";


export default function HiW() {
  return (
    <section id = "HiW">
    <main className="bg-white text-center justify-center max-w-[1500px] min-h-[500px] mt-6 p-10 rounded-s mx-auto">
      <h1 className="text-red-800 text-center">Easy onboarding</h1>
      <h2 className="text-black text-2xl mt-2 text-center">
        In only a few minutes, up and running
      </h2>
      <p className="text-gray-700 mt-2">
        Technical expertise is not required. The day you join up, your
        restaurant may go live.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-15 text-left">
        <div className="flex flex-col items-start mt-10">
          <span className="w-20 h-20 ml-28 rounded-full bg-black text-red-800 flex items-center justify-center font-bold text-2xl">
            1
          </span>
          <h2 className="text-black text-2xl ml-15 mt-6">Create your account</h2>
          <p className="text-black mt-4">
            Register for free. To begin, no credit card is needed.
          </p>

          <div className="mt-12 w-full max-w-[350px] rounded-md bg-black text-white p-4">
            <p className="text-white">
              <span className="mr-3 rounded-full bg-green-700 px-2 py-1">✓</span>
              Enter restaurant name
            </p>
            <p className="text-white mt-3">
              <span className="mr-3 rounded-full bg-green-700 px-2 py-1">✓</span>
              Choose your plan
            </p>
            <p className="text-white mt-3">
              <span className="mr-3 rounded-full bg-green-700 px-2 py-1">✓</span>
              Invite your team
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start mt-10">
          <span className="w-20 ml-28 h-20 rounded-full bg-black text-red-800 flex items-center  
          ml-20 justify-center font-bold text-2xl">
            2
          </span>
          <h2 className="text-black text-2xl mt-6 ml-15">Set up your menu</h2>
          <p className="text-black mt-4">
          Include your dishes, categories, costs, and images. Create it from scratch or import it from a spreadsheet.
          </p>
          <div className="mt-6 w-full max-w-[350px] rounded-md bg-black text-white p-4">
            <p className="text-white">
              <span className="mr-3 rounded-full bg-green-700 px-2 py-1">✓</span>
              Add categories to the menu.
            </p>
            <p className="text-white mt-3">
              <span className="mr-3 rounded-full bg-green-700 px-2 py-1">✓</span>
              Set modifiers and prices.
            </p>
            <p className="text-white mt-3">
              <span className="mr-3 rounded-full bg-green-700 px-2 py-1">✓</span>
              Upload dish photos
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start mt-10">
          <span className="ml-20 w-20 ml-28 h-20 rounded-full bg-black text-red-800 flex items-center justify-center font-bold text-2xl">
            3
          </span>
          <h2 className="text-black ml-15 text-2xl mt-6">Start taking orders</h2>
          <p className="text-black mt-4">
          Take orders right away. Monitor sales, oversee employees, and expand your eatery.
          </p>
          <div className="mt-6 w-full max-w-[350px] rounded-md bg-black text-white p-4">
            <p className="text-white">
              <span className="mr-3 rounded-full bg-green-700 px-2 py-1">✓</span>
              Take the first orders.
            </p>
            <p className="text-white mt-3">
              <span className="mr-3 rounded-full bg-green-700 px-2 py-1">✓</span>
              View the dashboard in real time.
            </p>
            <p className="text-white mt-3">
              <span className="mr-3 rounded-full bg-green-700 px-2 py-1">✓</span>
              Obtain daily reports
            </p>
          </div>
        </div>
      </div>
      
      
   
    </main>
</section>  
  );

}