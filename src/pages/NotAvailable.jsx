import React from 'react'

function NotAvailable() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col space-y-6">
        <h1 className="text-4xl font-extrabold text-white">Page Not Available</h1>
        <p className="text-sm text-white/60 mt-2">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
</div>
  )
}

export default NotAvailable