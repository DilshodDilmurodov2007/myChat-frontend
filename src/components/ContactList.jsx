import  { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UsersLoaderSkeleton from './UsersLoaderSkeleton';
import NoChatsFound from './NoChatsFound';
import { useAuthStore } from '../store/useAuthStore';

function ContactList() {
  const { getAllContacts, activeChat, allContacts, isUsersLoading, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoaderSkeleton />;
  if (allContacts.length === 0) return <NoChatsFound />;

  return (
    <div className='space-y-2'>
      {allContacts?.map((contact) => (
        <div 
          key={contact._id} 
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                      ${activeChat?._id === contact._id 
                        ? 'bg-cyan-500/30 shadow-md backdrop-blur-sm' 
                        : 'hover:bg-cyan-500/20 backdrop-blur-sm'}`}
          onClick={() => setSelectedUser(contact)}
        >
          <div className="relative">
            <img 
              src={contact.profilePic || './user.png'} 
              alt={contact.fullName} 
              className='w-12 h-12 rounded-full object-cover border border-gray-700' 
            />
            <span className={`absolute bottom-0 right-0 w-3 h-3
            ${onlineUsers.includes(contact._id) ? 'bg-green-500' : 'bg-gray-400'} border-2 border-gray-900 rounded-full`}></span>
          </div>
          <div className='flex-1 min-w-0'>
            <h4 className='text-slate-100 font-semibold truncate'>{contact.fullName}</h4>
            <p className='text-gray-300 text-sm truncate'>
             {contact.lastMessage?.text === "hidden_written_text@$$@123" ? "sent an image" : contact.lastMessage?.text || 'No messages yet'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContactList;
