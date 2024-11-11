import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className=" bg-slate-800 text-white  ">
        <div className=" mycontainer flex justify-between items-center px-4 py-5 h-14">
          <div className="logo font-bold text-white text-xl">
            <span className="text-green-400"> &lt;</span>
            <span>PASSWORD</span><span className="text-green-400">manager/&gt;</span>
            
        </div>
          <ul>
            <li className="flex gap-12">
              <a className="hover:font-bold text-xl text-green-500" href="/">Unique </a>
              <a className="hover:font-bold text-xl text-green-500" href="#">Safe</a>
              <a className="hover:font-bold text-xl text-green-500" href="#">Strong</a>
            </li>
          </ul>
          <div className="w-36" >
            <img  className="w-25 rounded-md  "src="/logo.png" alt="" />
          </div>
       
        </div>
        
        
      </nav>
     
    </>
  );
};

export default Navbar;
