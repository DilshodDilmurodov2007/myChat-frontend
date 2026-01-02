import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";


export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
    set({ isSoundEnabled: !get().isSoundEnabled })
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  getMessagesWithUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data })
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || "Failed to load messages")
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    if (!selectedUser || !authUser) return;

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiver: selectedUser._id,
      text: messageData.text,
      image: messageData.image || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      optimistic: true,
    };

    // 1️⃣ Optimistic UI update (SAFE)
    set((state) => ({
      messages: [...state.messages, optimisticMessage],
    }));

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      const realMessage = res.data;

      // 2️⃣ Replace optimistic message with real one
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === tempId ? realMessage : msg
        ),
        chats: state.chats.map((chat) =>
          chat._id === selectedUser._id
            ? { ...chat, lastMessage: realMessage }
            : chat
        ),
        allContacts: state.allContacts.map((contact) =>
          contact._id === selectedUser._id
            ? { ...contact, lastMessage: realMessage }
            : contact
        ),
      }));
    } catch (error) {
      // 3️⃣ Rollback optimistic message
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== tempId),
      }));

      toast.error(
        error?.response?.data?.message || "Failed to send message"
      );
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to fetch chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      // Fetch contacts along with their last message from backend
      const res = await axiosInstance.get("/messages/contacts");

      // res.data should now be an array of contacts with lastMessage
      set({ allContacts: res.data });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to load contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  subscribeToMessage: () => {
    const { selectedUser, isSoundEnabled } = get();
    const { authUser } = useAuthStore.getState();

    if(!selectedUser || !authUser) return;

    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      if(newMessage.senderId !== selectedUser._id) return;

      const currentMessages = get().messages
      set({messages: [...currentMessages, newMessage]})

      if(isSoundEnabled) {
        const notificationSound = new Audio("/sound/notification.mp3")

        notificationSound.currentTime = 0
        notificationSound.play().catch((e) => console.log("Audio play failed: ", e)
        )
      }
    })
  },
  unsubscribeToMessage: () => {
    const socket = useAuthStore.getState().socket
    socket.off("newMessage")
  }

}));
