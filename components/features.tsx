import React from "react";
import Image from "next/image";

export default function Features() {
  return (
    
    
    <section id = "features">
    
    <main className="bg-white  mt-6 p-10 grid-rows-2 rounded-xsm">
      <h1 className="text-red-800 text-2xl">All that you require</h1>
      <h2 className="text-black  text-5xl mb-5 mt-5 font-size: 100px font-style: 'Helvetica Neue'">
        High-Performance tools for<br></br> <span className = "text-red-800">every corner of your</span>  <br></br> Restaurant
      </h2>
      <div className="feature-card">
        <div className="feature-card-section">
          <Image src="/order-food_6876383.png" className="mt-3" alt="menu" width={50} height={50} />
          <h2 className = "text-1xl p-5 mr-43 text-white font-style: 'Helevetic Neue' ">Menu management</h2>
          <p className = "text-gray-400">
            With real-time updates that instantaneously <br></br>reach every table, you
            can quickly manage <br></br>your menu.
          </p>
        </div>
        <div className="feature-card-section">
        <Image src= "/order-tracking_3456419.png" className="mt-3" alt="menu" width={50} height={50} />
          <h2 className = "text-1xl p-5 mr-43">Order Tracking</h2>
          <p className = "text-gray-400">
          Orders are sent straight from the table to the kitchen.<br></br> Employees are continuously aware of<br></br> what will happen next. <br></br> 
          </p>
      
       </div>
       <div className="feature-card-section">
    <Image src = "/trend_10869656.png" className="mt-3"  alt="menu" width={50} height={50} />
          <h2 className = "text-1xl p-5 mr-43">Analytics and sales</h2>
          <p className = "text-gray-400">
          reports every day, every week, and every month. <br></br>Recognize your busiest times and greatest sellers. <br></br>
          </p>
      
       </div>
       <div className="feature-card-section">
        <Image src= "/calendar_17646101.png"   className="mt-3"  alt="menu" width={50} height={50} />
          <h2 className = "text-1xl p-5 mr-43">Staff Scheduling</h2>
          <p className = "text-gray-400">
            Manage shifts, roles and attendance <br></br>Easily maintain team organization <br></br>
          </p>
      
       </div>
       <div className="feature-card-section">
        <Image src="/table-reservation.png" className="mt-3"  alt="menu" width={50} height={50} />
          <h2 className = "text-1xl p-5 mr-43">Table Reservations</h2>
          <p className = "text-gray-400">
          Take reservations in person or online. <br></br>Use auto reminders to cut down on no-shows. <br></br>
          </p>
      
       </div>
       <div className="feature-card-section">
        <Image src="/payment-method.png" className="mt-3"  alt="menu" width={50} height={50} />
          <h2 className = "text-1xl p-5 mr-43">Billing and Payments</h2>
          <p className = "text-gray-400">
          Discounts can be applied, bills can be divided, <br></br>and various payment options can be easily accepted. <br></br>
          </p>
      
       </div>
      
        
      
      </div>
      
    </main>
</section>
  )
}

