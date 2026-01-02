import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import ChatHeader from './chatpanel/ChatHeader'
import ChatMessages from './chatpanel/ChatMessages'
import ChatInput from './chatpanel/ChatInput'
import NoChatHistoryPlaceholder from './chatpanel/NoChatHistoryPlaceholder'
import { LoaderIcon } from 'lucide-react'

function ChatContaioner() {
  const {getMessagesWithUserId, selectedUser, messages, isMessagesLoading,
    subscribeToMessage, unsubscribeToMessage
  } = useChatStore()
  const {authUser} = useAuthStore()

  useEffect(() => { 
    getMessagesWithUserId(selectedUser._id)
    subscribeToMessage()

    // clean up
    return () => unsubscribeToMessage()
  }, [selectedUser, getMessagesWithUserId, subscribeToMessage, unsubscribeToMessage])

  if(isMessagesLoading) return  <div className="h-screen flex items-center justify-center">
    <LoaderIcon className="size-10 animate-spin" />
  </div>;
  return (
    <div >
      <ChatHeader />
      <div className='flex-1 px-6 overflow-auto py-2 h-[calc(100vh-156px)]'>
        {messages.length > 0 ? (<ChatMessages authUser={authUser} messages={messages} selectedUser={selectedUser} />): (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
      <ChatInput />
    </div>
  )
}

export default ChatContaioner