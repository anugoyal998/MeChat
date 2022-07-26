import create from "zustand";

const state = create((set) => ({
  auth: {
    isAuth: false,
    user: null,
  },
  setAuth: (data) => set((state) => ({ auth: data })),
}));

export default state;
