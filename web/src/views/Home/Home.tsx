import React from "react";
import "./home.scss";
import Text from "./Text";
import { InfoProps } from "../../types/InfoProps";
import { formatWithDot } from "../../helper/format";

const Home: React.FC<{ userInfo: InfoProps[]; bottomInfo: InfoProps[] }> = ({
  userInfo,
  bottomInfo,
}) => {
  return (
    <div className="homeContainer">
      {userInfo.map((info, index) => (
        <Text
          key={index}
          text={`${info.label}${info.value !== "" ? ":" : ""} ${
            typeof info.value === "number"
              ? formatWithDot(info.value)
              : info.value
          }`}
          type={info.type}
          customClass={info.customClass}
        />
      ))}
      <div>
        {bottomInfo.map((info, index) => (
          <Text
            key={index}
            text={`${info.label}${info.value !== "" ? ":" : ""} ${info.value}`}
            type={info.type}
            customClass={info.customClass}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
