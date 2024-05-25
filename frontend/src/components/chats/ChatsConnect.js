import React from 'react'
import ChatProvider from '../context/ChatProvider'
import MyChatsHeader from './MyChatsHeader'
import MyChats from './MyChats'
import SingleChat from './SingleChat'

const ChatsConnect = () => {
  return (
    <ChatProvider>
      <div className='flex w-screen h-[100vh]'>
        <div className='w-1/3 border-x-2 bg-slate-300'>
          <MyChatsHeader/>
          <MyChats />
        </div>
        <div className='w-2/3'>
          <SingleChat />
        </div>
      </div>
    </ChatProvider>
  )
}

export default ChatsConnect