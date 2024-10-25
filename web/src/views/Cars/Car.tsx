import React from "react";
import { CarProps } from "../../types/CarProps";

const Car: React.FC<{ el: CarProps; customClass?: string }> = ({
  el,
  customClass,
}) => {
  return (
    <div className={`car ${customClass}`}>
      <p className="label">{el.label}</p>
      <p className="plate">{el.plate}</p>
    </div>
  );
};

export default Car;
