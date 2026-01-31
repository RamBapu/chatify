import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

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
}));
