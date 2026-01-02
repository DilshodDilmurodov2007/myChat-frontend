import React, { useRef, useState, useCallback } from 'react';
import useKeyboardSound from '../../hooks/useKeyboardSound';
import { useChatStore } from '../../store/useChatStore';
import toast from 'react-hot-toast';
import { ImageIcon, SendIcon, XIcon } from 'lucide-react';

function ChatInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const { sendMessage, isSoundEnabled } = useChatStore();

  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const autoResize = () => {
  const el = textareaRef.current;
  if (!el) return;

  el.style.height = 'auto';

  const maxHeight = 64;
  const newHeight = Math.min(el.scrollHeight, maxHeight);

  el.style.height = `${newHeight}px`;
  el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
};

  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!text.trim() && !imagePreview) return;

      if (isSoundEnabled) playRandomKeyStrokeSound();

      sendMessage({
        text: text.trim() || 'hidden_written_text@$$@123',
        image: imagePreview,
      });

      setText('');
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (textareaRef.current) textareaRef.current.style.height = '40px';
    },
    [text, imagePreview, isSoundEnabled, playRandomKeyStrokeSound, sendMessage]
  );

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const removeImage = useCallback(() => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage(e);
  }
};
  return (
    <div className="bg-transparent p-4">
  <div className="max-w-3xl mx-auto space-y-3">
      {/* Image preview */}
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 relative w-fit">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-xl border border-gray-600 shadow-md"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full
                       bg-red-600 flex items-center justify-center
                       text-white hover:bg-red-500 transition"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex items-end gap-3"
      >
        <textarea
  ref={textareaRef}
  rows={1}
  value={text}
  onChange={(e) => {
    setText(e.target.value);
    autoResize();
  }}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
    if (isSoundEnabled) playRandomKeyStrokeSound();
  }}
  placeholder="Type a message…"
  className="flex-1 resize-none bg-gray-800/70 border border-gray-600
             rounded-2xl py-3 px-4 text-sm
             outline-none placeholder-gray-400
             focus:ring-2 focus:ring-cyan-500
             min-h-10 max-h-20
             overflow-hidden no-scrollbar transition"
/>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-3 rounded-xl transition
            ${
              imagePreview
                ? 'bg-cyan-700 text-white shadow-md hover:bg-cyan-600'
                : 'bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        {/* Send button */}
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-500 text-white
                     p-3 rounded-xl shadow-md
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition"
          disabled={!text.trim() && !imagePreview}
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  </div>
);

}

export default ChatInput;
