import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  contacts: [],
  chats: [],
  messages: [],

  activeTab: "chats",
  selectedUser: null,

  isUsersLoading: false,
  isMessagesLoading: false,

  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  getAllContacts: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await axiosInstance.get("/messages/contacts");
      set({ contacts: res.data });
    } catch (error) {
      console.log("Error in fetching contacts:", error);
      toast.error(error.response?.data?.message || error.response?.data?.error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getAllChats: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      console.log("Error in fetching chats:", error);
      toast.error(error.response?.data?.message || error.response?.data?.error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesById: async (userId) => {
    try {
      set({ isMessagesLoading: true });
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("Error in fetching messages:", error);
      toast.error(error.response?.data?.message || error.response?.data?.error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const selectedUserId = get().selectedUser._id;
    const { messages } = get();

    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      recieverId: selectedUserId,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify the optimistic messages
    };

    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUserId}`,
        messageData,
      );

      set({ messages: messages.concat(res.data) });
    } catch (error) {
      // remove optimistic messages on failure
      set({ messages: messages });
      console.log("Error in fetching messages:", error);
      toast.error(error.response?.data?.message || error.response?.data?.error);
    }
  },
}));
