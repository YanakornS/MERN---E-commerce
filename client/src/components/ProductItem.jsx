import React from "react";

const ProductItem = ({ image, name, price, rating }) => {
  return (
    <div className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-sm w-64">
      <img src={image} alt="" className="rounded-2xl w-20" />
      <div className="space-y-1">
        <h5>{name}</h5>
        <div className="rating rating-sm">
          <input
            type="radio"
            name={name}
            className="mask mask-star-2 bg-orange-400"
            disabled
            defaultChecked={rating == 1 ? true : false}
          />
          <input
            type="radio"
            name={name}
            className="mask mask-star-2 bg-orange-400"
            disabled
            defaultChecked={rating == 2 ? true : false}
          />
          <input
            type="radio"
            name={name}
            className="mask mask-star-2 bg-orange-400"
            disabled
            defaultChecked={rating == 3 ? true : false}
          />
          <input
            type="radio"
            name={name}
            className="mask mask-star-2 bg-orange-400"
            disabled
            defaultChecked={rating == 4 ? true : false}
          />
          <input
            type="radio"
            name={name}
            className="mask mask-star-2 bg-orange-400"
            disabled
            defaultChecked={rating == 5 ? true : false}
          />
        </div>
        <p className="text-red">${price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
