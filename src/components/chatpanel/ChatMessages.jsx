import React, { useEffect, useRef, useState } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { LoaderIcon, ArrowDownIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

function ChatMessages({ authUser, messages, selectedUser }) {
  const { isMessagesLoading } = useChatStore();
  const containerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  function timeDisplay(time) {
    return formatDistanceToNow(new Date(time), { addSuffix: true });
  }

  // Scroll to bottom smoothly
  const scrollToBottom = (behavior = 'smooth') => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior,
    });
  };

  // Monitor scroll to show/hide "Jump to latest" button
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    setShowScrollButton(scrollTop + clientHeight < scrollHeight - 50);
  };

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderIcon className="w-10 h-10 animate-spin" />
      </div>
    );

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex flex-col space-y-4 p-4 overflow-y-auto h-full"
      >
        {messages.map((msg) => {
          const isMe = msg.senderId === authUser._id;
          return (
            <div
              key={msg._id}
              className={`chat ${isMe ? 'chat-end' : 'chat-start'}`}
            >
              <div className="chat-image avatar border border-gray-700 rounded-full">
                <div className="w-10 rounded-full">
                  <img
                    src={isMe ? authUser.profilePic : selectedUser.profilePic || './user.png'}
                    alt={msg.senderName}
                  />
                </div>
              </div>
              <div className="chat-header">
                {isMe ? 'You' : selectedUser.fullName}
                <time className="text-xs opacity-50 ml-2">
                  {timeDisplay(msg.updatedAt) || ''}
                </time>
              </div>
              <div className={`chat-bubble max-w-[70%] ${isMe ? 'bg-emerald-600' : 'bg-white/10'}`}>
                {msg.image && (
                  <img
                    src={msg.image}
                    alt={msg.senderName || (isMe ? 'You' : selectedUser?.fullName)}
                    className="object-cover max-w-125 max-h-125"
                  />
                )}
                {msg.text === "hidden_written_text@$$@123" ? "" : msg.text}
              </div>
              <div className="chat-footer opacity-50">{isMe ? msg.status || 'Delivered' : ''}</div>
            </div>
          );
        })}
      </div>

      {/* Jump to latest button */}
      {showScrollButton && (
        <button
          onClick={() => scrollToBottom()}
          className="absolute bottom-4 right-4 bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition"
        >
          <ArrowDownIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default ChatMessages;
