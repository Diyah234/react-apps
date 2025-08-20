'use client'
import React, {useState, useRef, useEffect} from 'react'
import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import { HiOutlineDotsVertical } from "react-icons/hi";

const ChatPage = () => {
    const [open , setOpen] = useState(false);
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() =>{
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [])
  return (
    <div className='w-full'>
        <div className='p-4 border-b-1 border-[#9B9B9B] flex flex-row items-center justify-between'>
            <div>
                <h3 className='font-bold text-base'>Contact name</h3>
            <p className='text-sm text-[#3795BD]'>online</p>
            </div>
            
            <HiOutlineDotsVertical />
        </div>
        <div className='p-4'>
  <div className='bg-[#F7F7F8] h-[61vh] overflow-y-auto p-4 flex flex-col gap-4 rounded-2x'>
    <div className="bg-[#3795BD] text-white px-2 p-1 w-fit max-w-[75%] rounded-2xl rounded-bl-none self-start mt-4">
      <span className='text-sm'>Hello!</span>
      <span className='text-[9px] pl-3 opacity-80'>00:08</span>
    </div>

    <div className="bg-gray-200 text-black px-3 p-1 w-fit max-w-[75%] rounded-2xl rounded-br-none self-end">
      <span className='text-sm'>Hi</span>
      <span className='text-[9px] pl-3 opacity-80'>00:08</span>
    </div>

    <div className="bg-[#3795BD] text-white px-2 p-1 w-fit max-w-[75%] rounded-2xl rounded-bl-none self-start">
      <span className='text-sm'>How're you doing?</span>
      <span className='text-[9px] pl-3 opacity-80'>00:08</span>
    </div>

    <div className="bg-gray-200 text-black px-3 p-1 w-fit max-w-[75%] rounded-2xl rounded-br-none self-end">
      <span className='text-sm'>I'm fine, and you?</span>
      <span className='text-[9px] pl-3 opacity-80'>00:08</span>
    </div>
     <div className="bg-[#3795BD] text-white px-2 p-1 w-fit max-w-[75%] rounded-2xl rounded-bl-none self-start">
      <span className='text-sm'>I'm good, how is work?</span>
      <span className='text-[9px] pl-3 opacity-80'>00:08</span>
    </div>

    <div className="bg-gray-200 text-black px-3 p-1 w-fit max-w-[75%] rounded-2xl rounded-br-none self-end">
      <span className='text-sm'>Work is fine</span>
      <span className='text-[9px] pl-3 opacity-80'>00:08</span>
    </div>
     <div className="bg-[#3795BD] text-white px-2 p-1 w-fit max-w-[75%] rounded-2xl rounded-bl-none self-start">
      <span className='text-sm'>What are you doing?</span>
      <span className='text-[9px] pl-3 opacity-80'>00:08</span>
    </div>

    <div className="bg-gray-200 text-black px-3 p-1 w-fit max-w-[75%] rounded-2xl rounded-br-none self-end">
      <span className='text-sm'>Eating, and you?</span>
      <span className='text-[9px] pl-3 opacity-80'>00:08</span>
    </div>
  </div>
</div>
<div className='p-4'>
        <div className='flex flex-row items-center justify-between  gap-2 p-2 border-2 border-[#3795BD] rounded-xl mb-5'>
            <div className='max-w-3xl w-[80%]'><input type="text" className='w-full focus:outline-none' /></div>
            <div className='mr-2'>
            <button className='mr-4 cursor-pointer'>
                <AiOutlineSend />
            </button>
            <button onClick={()=> setOpen(prev => !prev)} className='cursor-pointer'><MdOutlineEmojiEmotions /></button>
            
            </div>
        </div>
        <EmojiPicker open={open} className='relative left-[40%]' />
        </div>
    </div>
  )
}

export default ChatPage