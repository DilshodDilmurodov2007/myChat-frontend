import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UsersLoaderSkeleton from './UsersLoaderSkeleton';
import NoChatsFound from './NoChatsFound';
import { useAuthStore } from '../store/useAuthStore';

function ChatList() {
  const { getMyChatPartners, chats, activeChat, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoaderSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className='space-y-2'>
      {chats.map((item) => (
        <div 
          key={item._id} 
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                      ${activeChat?._id === item._id 
                        ? 'bg-cyan-500/30 shadow-md backdrop-blur-sm' 
                        : 'hover:bg-cyan-500/20 backdrop-blur-sm'}`}
          onClick={() => setSelectedUser(item)}
        >
          <div className="relative">
            <img 
              src={item.profilePic || './user.png'} 
              alt={item.fullName} 
              className='w-12 h-12 rounded-full object-cover border border-gray-700' 
            />
            <span className={`absolute bottom-0 right-0 w-3 h-3
            ${onlineUsers.includes(item._id) ? 'bg-green-500' : 'bg-gray-400'} border-2 border-gray-900 rounded-full`}></span>
          </div>
          <div className='flex-1 min-w-0'>
            <h4 className='text-slate-100 font-semibold truncate'>{item.fullName}</h4>
            <p className='text-gray-300 text-sm truncate'>
              {item.lastMessage?.text === "hidden_written_text@$$@123" ? "sent an image" : item.lastMessage?.text || 'No messages yet'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatList;
