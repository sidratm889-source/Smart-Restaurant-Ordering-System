import React from "react";
import { ArrowRight } from "lucide-react";


export default function HiW() {
  return (
    <section id = "HiW">
    <main className="bg-white text-center justify-center max-w-[1500px] min-h-[500px] mt-6 p-10 rounded-s mx-auto">
      <h1 className="head-section">Easy onboarding</h1>
      <h2 className="head-section2">
        In only a few minutes, up and running
      </h2>
      <p className="paragraph-section">
        Technical expertise is not required. The day you join up, your
        restaurant may go live.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-15 text-left">
        <div className="flex flex-col items-start mt-10">
          <span className="span">
            1
          </span>
          <h2 className="head1">Create your account</h2>
          <p className="para1">
            Register for free. To begin, no credit card is needed.
          </p>

          <div className="card">
            <div className = "check-arrow">
              
              <ArrowRight className = "arrow"/>
              
             <span className = "span1"> Enter restaurant name</span>
            </div>
            <div className = "check-arrow">
               <ArrowRight className = "arrow"/>
              <span className = "span1">Choose your plan</span>
            </div>
            <div className = "check-arrow">
              <ArrowRight className = "arrow"/>
               <span className = "span1">
                Invite your team</span>
            </div>
          </div>
          </div>
        

        <div className="flex flex-col items-start mt-10">
          <span className="span">
            2
          </span>
          <h2 className="head1">Set up your menu</h2>
          <p className="para1">
          Include your dishes, categories, costs, and images. Create it from scratch or import it from a spreadsheet.
          </p>
          <div className="card">
            <div className = "check-arrow">
                <ArrowRight className = "arrow"/>
              <span className = "span1">
              Add categories to the menu.
              </span>
            </div>
            <div className = "check-arrow">
                <ArrowRight className = "arrow"/>
             <span className = "span1">
              Set modifiers and prices.
              </span>
            </div>
            <div className = "check-arrow">
                <ArrowRight className = "arrow"/>
              <span className = "span1">
              Upload dish photos
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start mt-10">
          <span className="span">
            3
          </span>
          <h2 className="head1">Start taking orders</h2>
          <p className="para1">
          Take orders right away. Monitor sales, oversee employees, and expand your eatery.
          </p>
          <div className="card">
            <div className = "check-arrow">
                <ArrowRight className = "arrow"/>
              <span className = "span1">
              Take the first orders.
              </span>
            </div>
            <div className = "check-arrow">
                <ArrowRight className = "arrow"/>
              <span className = "span1">
              View the dashboard in real time.
              </span>
            </div>
            <div className="check-arrow">
              <ArrowRight className = "arrow"/>
              <span className = "span1">
              Obtain daily reports
              </span>
            </div>
          </div>
        </div>
      </div>
      
      
   
    </main>
</section>  
  );

}