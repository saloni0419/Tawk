import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  // checkAuth if user is authenticated or not even page is refreshed
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check"); // it is in be to check user is authenticated or not (auth page)

      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

// this page is like a global state to store auth related data
// we can check if user is authenticated or not
