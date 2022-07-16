import { atom } from "recoil";

const socketState = atom({
  key: "socketState",
  default: null,
});

export default socketState;
