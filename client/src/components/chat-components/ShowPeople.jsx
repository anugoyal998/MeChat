import React from "react";
import img from "../../img/avatar.png";

const data = [
  {
    avtar: img,
    name: "anubhav",
    msg: "hell0",
    time: "11:00",
  },
  {
    avtar: img,
    name: "anubhav",
    msg: "hell0",
    time: "11:00",
  },
  {
    avtar: img,
    name: "anubhav",
    msg: "hell0",
    time: "11:00",
  },
  {
    avtar: img,
    name: "anubhav",
    msg: "hell0",
    time: "11:00",
  },
  {
    avtar: img,
    name: "anubhav",
    msg: "hell0",
    time: "11:00",
  },
  {
    avtar: img,
    name: "anubhav",
    msg: "hell0",
    time: "11:00",
  },
  {
    avtar: img,
    name: "anubhav",
    msg: "hell0",
    time: "11:00",
  },
  {
    avtar: img,
    name: "anubhav",
    msg: "hell0",
    time: "11:00",
  },
];

const ShowPeople = () => {
  return (
    <div className="flex space-y-2 flex-col mt-2">
      {data?.map((p, index) => {
        return <Card key={index} data={p} />;
      })}
    </div>
  );
};

const Card = (props) => {
	const {data} = props
  return (
    <div className="flex justify-between p-3 cursor-pointer hover:bg-hoverBg rounded-lg border shadow-sm">
      <div className="flex items-center space-x-2">
        <img src={data.avtar} alt="" className="w-14 h-14 rounded-full border" />
		<div>
			<p className="text-lg font-[800] capitalize">{data.name}</p>
			<p className="text-gray-700">{data.msg}</p>
		</div>
      </div>
	  <p>{data.time}</p>
    </div>
  );
};

export default ShowPeople;
