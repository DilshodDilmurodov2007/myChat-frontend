import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import ProfileHeader from '../components/ProfileHeader'
import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ChatList from '../components/ChatList'
import ContactList from '../components/ContactList'
import ChatContaioner from '../components/ChatContaioner'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder'

function ChatPage() {
  const { logout } = useAuthStore()
  const { activeTab, selectedUser } = useChatStore()
  const isChatOpen = Boolean(selectedUser)

  return (
    <div className="w-screen min-h-[100dvh] flex flex-col md:flex-row bg-slate-950 overflow-hidden">

      {/* Left Sidebar */}
      <aside
        className={`w-full md:w-80 md:shrink-0 bg-slate-800/50 backdrop-blur-sm flex flex-col border-r border-slate-700
        ${isChatOpen ? 'hidden md:flex' : 'flex'}`}
      >
        <ProfileHeader />
        <ActiveTabSwitch />

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === 'chats' ? <ChatList /> : <ContactList />}
        </div>
      </aside>

      {/* Right Chat Area */}
      <main
        className={`flex-1 min-h-0 flex flex-col bg-slate-900/50 backdrop-blur-sm
        ${isChatOpen ? 'flex' : 'hidden md:flex'}`}
      >
        {selectedUser ? <ChatContaioner /> : <NoConversationPlaceholder />}
      </main>

    </div>
  )
}

export default ChatPage
