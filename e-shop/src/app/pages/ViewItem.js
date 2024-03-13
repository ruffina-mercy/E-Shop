import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks/hooks";
import { UpdateCart, selectItem } from "../state/features/Item/ItemSlice";

const ViewItem = () => {
  const [viewItem, setViewItem] = useState(null);
  const [error, setError] = useState(null);
  const cartDataView = useAppSelector(selectItem).viewCart[0];
  const dispatch = useAppDispatch();

  useEffect(() => {}, [cartDataView]);

  const handleIncrement = (id) => {
    dispatch(UpdateCart(id, "increment"));
  };

  const handleDecrement = (id) => {
    dispatch(UpdateCart(id, "decrement"));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cartDataView) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-lg font-semibold text-gray-800">
        {/* {`${cartDataView.strCategory} : ${cartDataView.strMeal}`} */}
        {cartDataView.strMeal}
      </h2>
      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-4">
          <img
            className=" h-48 rounded-md object-cover"
            src={cartDataView.strMealThumb}
            alt={`Meal: ${cartDataView.strMeal}`}
          />
        </div>
        <div className="col-span-8">
          <div className=" mx-4">
            <h2 className="text-lg font-semibold text-gray-800 ">
              {cartDataView.strMeal}
            </h2>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="font-semibold text-base mt-4">
              ₹{cartDataView.price}
            </p>
            <div className="flex ">
              <button
                onClick={() => handleDecrement(cartDataView.idMeal)}
                className="bg-gray-300 py-2 px-4"
              >
                -
              </button>
              <div className="mb-4">
                <p className="mx-4">{cartDataView.quantity}</p>
              </div>
              <button
                onClick={() => handleIncrement(cartDataView.idMeal)}
                className="bg-gray-300 py-2 px-4"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItem;
