import React, { useState, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from 'lucide-react'

const notificationSound = new Audio("/sound/mouse-click.mp3")

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore()
  const { isSoundEnabled, toggleSound } = useChatStore()
  const [selectedImage, setSelectedImage] = useState(null)

  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
   if (!file) return;
   
   const reader = new FileReader()
   reader.readAsDataURL(file)
   
   reader.onloadend = async () => {
    const base64Image = reader.result;
    setSelectedImage(base64Image);

    await updateProfile({ profilePic: base64Image });
   }
  }

  return (
    <div className="p-4 border-b border-slate-700/50 h-18">
      <div className="flex items-center justify-between">

        {/* Left: Avatar + Name */}
        <div className="flex items-center gap-3">

          <div
            className="avatar cursor-pointer group"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="relative w-12 rounded-full overflow-hidden ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={selectedImage || authUser?.profilePic || '/user.png'}
                alt="User avatar"
                className="object-cover"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                <span className="text-white text-xs font-medium">
                  Change
                </span>
              </div>
            </div>
          </div>

          <div className="leading-tight">
            <h3 className="font-semibold text-sm text-slate-100">
              {authUser?.fullName || 'Unknown User'}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Online
            </p>
          </div>

        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              toggleSound();
              // Play or pause the notification sound
              if (isSoundEnabled) {
                notificationSound.play();
              }
            }}
            className="btn btn-ghost btn-sm"
          >
            {isSoundEnabled ? <Volume2Icon size={18} /> : <VolumeOffIcon size={18} />}
          </button>

          <button
            onClick={() => {
              logout();
               if (isSoundEnabled) {
                notificationSound.play();
              }
            }}
            className="btn btn-ghost btn-sm text-error"
          >
            <LogOutIcon size={18} />
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  )
}

export default ProfileHeader
