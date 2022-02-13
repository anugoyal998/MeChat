import React from "react";
import { FiPaperclip } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";

const Editor = () => {
  return (
    <div
      className="mx-5 bg-white h-16 rounded-xl py-3 px-5 flex justify-between space-x-3 items-center shadow-lg absolute bottom-6"
      style={{ width: "calc(100vw - 300px - 4rem)" }}
    >
      <input
        type="text"
        placeholder="Write your message..."
        className="w-full text-lg no-outline"
      />
      <div className="flex items-center space-x-2">
        <div>
          <FiPaperclip className="text-2xl cursor-pointer animation hover:scale-125 opacity-60" />
        </div>
        <button className="h-10 w-12 bg-myBlueDark flex-center-center rounded-lg">
          <div>
            <IoIosSend className="text-2xl text-white" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Editor;
