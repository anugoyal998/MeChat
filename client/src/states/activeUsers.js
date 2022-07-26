import create from "zustand";

const state = create((set) => ({
  activeUsers: [],
  setActiveUsers: (data) => set((state) => ({ activeUsers: data })),
}));

export default state;
