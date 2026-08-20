import React from "react";
import Image from "next/image";
      import {
  UtensilsCrossed,
  PackageCheck,
  ChartColumn,
  CalendarClock,
  CalendarCheck2,
  CreditCard,
  
} from "lucide-react";



export default function Features() {
  return (
    
    
    <section id = "features">
    
    <main>
      <h1 className=  "headline1">All that you require</h1>
      <h2 className= "headline2">
        High-Performance tools for<br></br> <span className = "text-red-800">every corner of your</span>  <br></br> Restaurant
      </h2>
      <div className="feature-card">
        <div className="feature-card-section ">
         <div className = "icon-box">
          <UtensilsCrossed  className = "icon"/>
         </div>
          <h2 className = "headline3">Menu management</h2>
          <p className = "p1">
            With real-time updates that instantaneously <br></br>reach every table, you
            can quickly manage <br></br>your menu.
          </p>
        </div>
        <div className="feature-card-section">
        <div className = "icon-box">
          <PackageCheck  className = "icon"/>
        </div>
          <h2 className = "headline3">Order Tracking</h2>
          <p className = "p1">
          Orders are sent straight from the table to the kitchen.<br></br> Employees are continuously aware of<br></br> what will happen next. <br></br> 
          </p>
      
       </div>
       <div className="feature-card-section">
    <div className = "icon-box">
      <ChartColumn className = "icon"/>
      </div>
          <h2 className = "headline3">Analytics and sales</h2>
          <p className = "p1">
          reports every day, every week, and every month. <br></br>Recognize your busiest times and greatest sellers. <br></br>
          </p>
      
       </div>
       <div className="feature-card-section">
        <div className = "icon-box">
          <CalendarClock className = "icon"/>
        </div>
          <h2 className = "headline3">Staff Scheduling</h2>
          <p className = "p1">
            Manage shifts, roles and attendance <br></br>Easily maintain team organization <br></br>
          </p>
      
       </div>
       <div className="feature-card-section">
        <div className = "icon-box">
          <CalendarCheck2 className = "icon"/>
          
          </div>
          <h2 className = "headline3">Table Reservations</h2>
          <p className = "p1">
          Take reservations in person or online. <br></br>Use auto reminders to cut down on no-shows. <br></br>
          </p>
      
       </div>
       <div className="feature-card-section">
      <div className = "icon-box">
        <CreditCard className = "icon"/>
        </div>
          <h2 className = "headline3">Billing and Payments</h2>
          <p className = "p1">
          Discounts can be applied, bills can be divided, <br></br>and various payment options can be easily accepted. <br></br>
          </p>
      
       </div>
      
        
      
      </div>
      
    </main>
</section>
  )
}

