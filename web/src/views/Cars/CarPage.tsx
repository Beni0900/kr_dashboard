import React from "react";
import "./car.scss";
import Car from "./Car";
import { CarProps } from "../../types/CarProps";

const CarPage: React.FC<{ carList: CarProps[] }> = ({ carList }) => {
  return (
    <div className="carContainer">
      <p className="carContainerTitle">Tulajdonban lévő járművek</p>
      <div className="carList">
        <Car el={{ label: "Név", plate: "Rendszám" }} customClass="carHeader" />
        {carList.map((el, i) => (
          <Car key={i} el={el} />
        ))}
      </div>
    </div>
  );
};

export default CarPage;
