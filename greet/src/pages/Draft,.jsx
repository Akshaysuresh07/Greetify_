import React from 'react'
import Editor from '../Editor'

function Draft() {
  return (
    <>
    <div className='flex flex-col items-center p-25 '>
    <input className='w-[600px] h-10  p-5 border-2 rounded-xl border-black-400 mt-6' type="text" placeholder="recipient"/>
    <input className='w-[600px] h-10 p-5 rounded-xl  border-2 border-black-400 mt-6 mb-6  ' type="text" placeholder="subject"/>
    <Editor  />
  
    </div>
  
    </>
  )
}

export default Draft