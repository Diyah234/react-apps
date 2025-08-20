import React from 'react'
import ChatList from '../list/page'
import ChatPage from '../chat/page'

const Dashboard = () => {
  return (
    <div className='bg-[#3795BD] w-full p-4'>
        <div className='w-full max-w-4xl mx-auto rounded-lg bg-white mt-18 mb-10 flex flex-row '>
            <div className='w-[30%] p-4'><ChatList /></div>
            
            <div className='border-l-1 border-[#9B9B9B] ml-5 w-[70%]'><ChatPage /></div>
            
        </div>
    </div>
  )
}

export default Dashboard