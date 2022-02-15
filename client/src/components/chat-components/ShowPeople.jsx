import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import allUsersState from "../../atoms/allUsersState";
import authState from "../../atoms/authState";
import img from "../../img/avatar.png";
import { getAllUsers } from "../../http";
import errorHandler from "../../utils/errorHandler";
import currentChatState from "../../atoms/currentChatState";

const ShowPeople = ({ search, setSearch, flag, setFlag }) => {
  const { user } = useRecoilValue(authState);
  const [users, setUsers] = useRecoilState(allUsersState);
  useEffect(() => {
    async function fetch() {
      await errorHandler(async () => {
        const { data } = await getAllUsers();
        setUsers(data?.users);
      }, `client\src\components\chat-components\ShowPeople.jsx`);
    }
    fetch();
  }, []);
  return (
    <div className="flex space-y-2 flex-col mt-2">
      {users?.map((p, index) => {
        return user?._id !== p._id && <Card key={index} data={p} flag={flag} setFlag={setFlag} />;
      })}
    </div>
  );
};

const Card = (props) => {
  const { data, flag, setFlag } = props;
  const [currentChat, setCurrentChat] = useRecoilState(currentChatState);
  const handleClick = () => {
    setCurrentChat(data)
    setFlag(true)
  }
  return (
    <div
      className="flex justify-between p-3 cursor-pointer hover:bg-hoverBg rounded-lg border shadow-sm"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-2">
        <img
          src={data?.avatar ? data?.avatar : img}
          alt=""
          className="w-14 h-14 rounded-full border"
        />
        <div>
          <p className="text-lg font-[800] capitalize">{data?.name}</p>
          <p className="text-gray-700">{data?.msg}</p>
        </div>
      </div>
      <p>{data?.time}</p>
    </div>
  );
};

export default ShowPeople;
