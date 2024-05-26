import React, { useState } from 'react'
import ChatProvider from '../context/ChatProvider'
import MyChatsHeader from './MyChatsHeader'
import MyChats from './MyChats'
import SingleChat from './SingleChat'

const ChatsConnect = () => {
  const [fetchAgain,setFetchAgain] = useState(false);
  return (
    <ChatProvider>
      <div className='flex w-screen h-[100vh] overflow-hidden' >
        <div className='w-1/3 border-x-2 bg-slate-300'>
          <MyChatsHeader/>
          <MyChats fetchAgain={fetchAgain}/>
        </div>
        <div className='w-2/3'>
          <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
      </div>
    </ChatProvider>
  )
}

export default ChatsConnect