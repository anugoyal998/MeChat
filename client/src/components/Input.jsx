import React from "react";

const Input = (props) => {
  return (
    <input
      {...props}
      className={`${props.margin && "my-2"} ${
        props.classes
      } border w-full lg:min-w-[350px] bg-myBlueFaded text-myBlueDark no-outline py-3 px-6 rounded-3xl text-lg font-medium`}
    />
  );
};

export default Input;
