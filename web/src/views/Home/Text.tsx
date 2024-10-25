import React from "react";

const Text: React.FC<{
  text: string;
  type?: string;
  customClass?: string;
}> = ({ text, type, customClass }) => {
  return (
    <div className={`${customClass} homeText`}>
      <p>
        {text}{" "}
        <span
          style={{
            color:
              type === "Ft" ? "green" : type === "PP" ? "#5F9CFE" : "#FFF356",
          }}
        >
          {type}
        </span>
      </p>
    </div>
  );
};

export default Text;
