import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LoaderIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    email: "", password: ""
  })
  const { login, isLoggingIn } = useAuthStore()
  const handleLoginForm = (e) => {
    e.preventDefault()
    login(loginForm)
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold text-white">Log In</h1>
          <p className="text-sm text-white/60 mt-2">
            Welcome back — enter your credentials to continue.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLoginForm}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-white/60 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            {isLoggingIn ? (<LoaderIcon className="w-full h-5 animate-spin text-center" />) :
            "Log In"}
          </button>

          <p className="text-sm text-white/60 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-white/80 hover:underline">
              Sign up
            </Link>
          </p>
        </form>

        {/* Badges */}
        <div className="flex gap-2 pt-2 justify-center">
          <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70">Secure</span>
          <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70">Minimal</span>
          <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70">Fast</span>
        </div>

      </div>
    </div>
  );
}
