import React from "react";
import { formatWithDot } from "../../helper/format";
import { fetchNui } from "../../helper/fetchNui";

const Card: React.FC<{ label: string; price: number; name: string }> = ({
  label,
  price,
  name,
}) => {
  return (
    <div className="premiumItem">
      <img src={`nui://csoki_inventory/ui/dist/images/${name}.png`} />
      <p className="label">{label}</p>
      <p className="price">
        {formatWithDot(price)} <span>PP</span>
      </p>
      <button onClick={() => fetchNui("buyItem", { name: name })}>
        Vásárlás
      </button>
    </div>
  );
};

export default Card;
