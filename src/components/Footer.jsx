import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center fixed bottom-0 w-full'>
         <div className="logo font-bold text-white text-xl">
            <span className="text-green-500"> &lt;</span>
            <span className='text-green-400'>PASSWORD</span><span className="text-white">manager/&gt;</span>
            
        </div>
    <div className='flex justify-center items-center'>
        Created with <i class="fa-solid fa-heart w-5 mx-1 py-2 "></i> by samay
    </div>
    </div>
  )
}

export default Footer
