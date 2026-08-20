"use client"
import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";


  export default function Footer(){
    return(
   
            <footer className = "Footer">
                <div className = "footerbox">
                 <h1 className = "f-h1">SRMS</h1>
                 <h2 className = "f-h2">Smart Restaurant Management System</h2>
                 <p className = "f-p1">Manage orders, menus, staff, and customers from one powerful platform.</p>
                 </div>
               
                 <nav className = "nav">
                  
                  <h1 className = "explore-h1">Explore</h1>
                  <ul className="nav-ul">
                    <li>
                  <Link href = "/#home" className = "Link1">Home</Link>
                  </li>
                  <li>
                  <Link href = "/#features" className = "Link1">Features</Link>
                  </li>
                  <li>
                  <Link href = "/#HiW" className = "Link1">How it works</Link>
                  </li>
                  <li>
                  <Link href = "/#livedemo" className = "Link1">Restaurant Demo</Link>
                  </li>
                  <li>
                    <Link  href="/?form=signup#signup-login" className = "Link1">Login</Link>
                  </li>
                  <li>
                    <Link href="/?form=login#signup-login" className = "Link1">Signup</Link>
                  </li>
                  </ul>
                   
                  </nav>
                  
                
                  <div className = "contact">
                    <h1 className = "contact-h1">Contact Us</h1>
                    <p className = "contact-p">Email: srmssupport@gmial.com</p>
                    <p className = "contact-p"> +92 305 9828934</p>
                    <p className = "contact-p">Address: Lahore, Pakistan</p>
                  </div>
                  <div className = "linkscontainer">
                    <h1 className = "link-h1">Follow Us on</h1>
                    <Link  href = "https://www.facebook.com" target= "blank" className = "socialink">
                    <FaFacebook className = "facebook"/>
                    <span className = "span-p">Facebook</span>
                    </Link>
                    <Link href = "https://www.instagram.com" target = "blank" className = "socialink">
                    <FaInstagram className = "instagram"/>
                    <span className = "span-p">Instagram</span>
                    </Link>
                    <Link href = "https://www.linkedin.com" target = "blank" className = "socialink">
                    <FaLinkedin className = "linkedin"/>
                    <span className = "span-p">Linkedin</span>
                    </Link>
                    <Link href = "https://github.com" target = "blank" className = "socialink">
                    <FaGithub className = "github"/>
                    <span className = "span-p">Github</span>
                    </Link>


                  </div>
                 
                

              

            </footer>
            

        
    );
  }