import { create } from 'zustand';
import { persist } from "zustand/middleware";
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = "https://mychat-backend-1-8s9u.onrender.com";
// const BASE_URL = 'http://localhost:3000/'

export const useAuthStore = create(
    persist(
        (set, get) => ({
            authUser: null,
            isCheckingAuth: true,
            isSigningUp: false,
            isLoggingIn: false,
            socket: null,
            token: null,
            onlineUsers: [],

            checkAuth: async () => {
                try {
                    const res = await axiosInstance.get("/auth/check");

                    const user = res.data.user ?? res.data;      // <-- ✅ key fix
                    const token = res.data.token ?? null;

                    set({ authUser: user, token });
                    get().connectSocket();
                } catch (error) {
                    console.error("Auth check failed:", error);
                    set({ authUser: null, token: null });
                } finally {
                    set({ isCheckingAuth: false });
                }
            },

            signup: async (data) => {
                set({ isSigningUp: true });
                try {
                    const res = await axiosInstance.post("/auth/signup", data);
                    set({ authUser: res.data.user, token: res.data.token });
                    toast.success("Account created successfully");
                    get().connectSocket();
                } catch (error) {
                    console.log(error);
                    toast.error(error?.response?.data?.message);
                } finally {
                    set({ isSigningUp: false });
                }
            },
            login: async (data) => {
                set({ isLoggingIn: true });
                try {
                    const res = await axiosInstance.post("/auth/login", data);
                    set({ authUser: res.data.user, token: res.data.token });
                    toast.success("Logged in successfully");
                    get().connectSocket();
                } catch (error) {
                    console.log(error?.response?.data?.message);
                    toast.error(error?.response?.data?.message);
                } finally {
                    set({ isLoggingIn: false });
                }
            },
            logout: async () => {
                try {
                    await axiosInstance.post("/auth/logout");
                    setTimeout(() => {
                        set({ authUser: null, token: null });
                        toast.success("Logged out successfully");
                    }, 1000);

                    get().disconnectSocket();
                } catch (error) {
                    toast.error("Logout error");
                }
            },
            updateProfile: async (data) => {
                try {
                    const res = await axiosInstance.put("/auth/update-profile", data);

                    // if update-profile returns the user object directly
                    const updatedUser = res.data.user ?? res.data;

                    set({ authUser: updatedUser });
                    toast.success("Profile updated successfully");
                } catch (error) {
                    console.log("Error updating profile:", error);
                    toast.error(error?.response?.data?.message || "Error updating profile");
                }
            },

            connectSocket: () => {
                const { authUser, socket, token } = get();
                if (!authUser || !token || socket?.connected) return;

                const newSocket = io(BASE_URL, {
                    auth: { token },
                    withCredentials: true,
                    transports: ["websocket", "polling"],
                });

                newSocket.on("getOnlineUsers", (userIds) => {
                    set({ onlineUsers: userIds });
                });

                set({ socket: newSocket });
            },

            disconnectSocket: () => {
                const { socket } = get();
                if (socket) {
                    socket.disconnect();
                    set({ socket: null, onlineUsers: [] });
                }
            },
        }
    ),

        {
            name: 'auth-storage',
            partialize: (state) => ({ authUser: state.authUser, token: state.token }),
        }
    )
);