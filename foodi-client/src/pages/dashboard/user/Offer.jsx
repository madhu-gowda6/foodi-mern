import React from 'react'
import { FaSadTear } from "react-icons/fa";

const Offer = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              No offers! available<span className="text-green"> Yet</span>
            </h2>
          </div><FaSadTear className=' text-9xl mt-5 pt-5'/>
        </div>
      </div>
    </div>
  )
}

export default Offer