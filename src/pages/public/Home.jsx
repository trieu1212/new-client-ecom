import React, { useEffect } from 'react'
import {Sidebar, Banner, BestSeller,DealDaily} from '../../components/'
const Home = () => {
  return (
    <>
      <div className='w-main flex'>
        <div className='flex flex-col gap-5 w-[25%] flex-auto border-r '>
            <Sidebar/>
            <DealDaily/>
        </div>
        <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
            <Banner/>
            <BestSeller/>
        </div>
      </div>
      <div className='w-full h-[80px]'>

      </div>
    </>
  )
}

export default Home