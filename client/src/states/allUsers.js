import create from "zustand";

const state = create((set) => ({
  users: [],
  setUsers: (data) => set((state) => ({ users: data })),
}));

export default state;
