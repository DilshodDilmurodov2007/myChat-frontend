import React, { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore'
import { XIcon } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'

function ChatHeader() {
    const {selectedUser, setSelectedUser} = useChatStore()
    const {onlineUsers} = useAuthStore()
    useEffect(()=> {
      const handleEscKey = (event) => {
        if (event.key === 'Escape') {
          setSelectedUser(null);
        }
      }
      window.addEventListener('keydown', handleEscKey);
      return () => {
        window.removeEventListener('keydown', handleEscKey);
      }
    }, [selectedUser])
  return (
    <div className='flex justify-between items-center p-4 border-b border-slate-700 h-18'>
   
      <div className='flex items-center space-x-3'>
        <div className={`avatar`}>
          <div className='w-12 h-12 rounded-full object-cover'>
            <img src={selectedUser.profilePic || "./user.png"} alt={selectedUser.fullName} className='w-12 h-12 rounded-full' />
          </div>
        </div>

        <div>
          <h3 className='text-slate-200 font-medium'>{selectedUser.fullName}</h3>
          <p className='text-slate-400 text-sm'>{onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}</p>
        </div>
      </div>

      <button onClick={() => setSelectedUser(null)} >
        <XIcon className='text-slate-400 hover:text-slate-200' size={20} />
      </button>
    </div>
  )
}

export default ChatHeader