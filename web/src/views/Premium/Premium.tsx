import React, { useState } from "react";
import "./premium.scss";
import { formatWithDot } from "../../helper/format";
import Card from "./Card";
import { PremiumNavbarProps } from "../../types/PremiumNavbarProps";
import { PremiumItemProps } from "../../types/PremiumItemProps";

const Premium: React.FC<{
  navItems: PremiumNavbarProps[];
  premiumItems: PremiumItemProps[];
  currentPp: number;
}> = ({ navItems, premiumItems, currentPp }) => {
  const [activeItem, setActiveItem] = useState<string>(navItems[0].value);

  return (
    <div className="premiumContainer">
      <div className="premiumNavbar">
        {navItems.map((item, i) => (
          <div
            key={i}
            className={`navItem ${activeItem === item.value ? "active" : ""}`}
            onClick={() => setActiveItem(item.value)}
          >
            <p>{item.label}</p>
          </div>
        ))}
      </div>
      <div
        className="premiumItemsContainer"
        style={{
          maxHeight:
            navItems.length <= 3
              ? "55vh"
              : navItems.length <= 6
              ? "48vh"
              : navItems.length <= 9
              ? "41vh"
              : "20vh",
        }}
      >
        {premiumItems.map((el, i) => {
          if (activeItem == el.category) {
            return (
              <Card key={i} label={el.label} price={el.price} name={el.name} />
            );
          }
        })}
      </div>
      <p className="currentPp">
        Prémium egyenleged: {formatWithDot(currentPp)} <span>PP</span>
      </p>
    </div>
  );
};

export default Premium;
