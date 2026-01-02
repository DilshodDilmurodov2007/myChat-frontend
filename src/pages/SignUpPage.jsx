import React from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderIcon } from 'lucide-react'

export default function SignUpPage() {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });
  const {signup, isSigningUp} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData)
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold text-white">Create Account</h1>
          <p className="text-sm text-white/60 mt-2">
            Join the network — sleek, private, fast.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              placeholder="Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className=" w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
           {isSigningUp ? (<LoaderIcon className="w-full h-5 animate-spin text-center" />) 
           : "Create Account"}
          </button>

          <p className="text-sm text-white/60 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-white/80 hover:underline">
              Log in
            </Link>
          </p>
        </form>

        {/* Badges */}
        <div className="flex gap-2 pt-2 justify-center">
          <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70">Free</span>
          <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70">Minimal</span>
          <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70">Modern</span>
        </div>

      </div>
    </div>
  );
}
