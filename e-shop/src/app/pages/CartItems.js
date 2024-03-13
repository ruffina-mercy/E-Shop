import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks/hooks";
import { UpdateCart, selectItem } from "../state/features/Item/ItemSlice";
import { PlaceOrder } from "../state/features/cartItem/CartItemSlice";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const [items, setItems] = useState([]);
  const dispatch = useAppDispatch();
  const mealsList = useAppSelector(selectItem).cartData;
  const history = useNavigate();

  useEffect(() => {
    setItems(mealsList);
  }, [mealsList]);

  const handleIncrement = (id) => {
    dispatch(UpdateCart(id, "increment"));
  };

  const handleDecrement = (id) => {
    dispatch(UpdateCart(id, "decrement"));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const handlePlaceOrder = (items) => {
    // Implement your logic for placing an order here
    dispatch(PlaceOrder(items));
    history("/order");
  };

  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          {items.map((item) => (
            <div key={item?.idMeal} className="mb-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg p-5">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <img
                      className="h-20 w-20 rounded-md"
                      src={item.strMealThumb}
                      alt={`Item: ${item.strMeal}`}
                    />
                    <div className="flex flex-col ms-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.strMeal}
                      </h2>
                      <p className="text-gray-500 mt-2">₹{item?.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrement(item.idMeal)}
                      className="bg-gray-300 py-2 px-4"
                    >
                      -
                    </button>
                    <p className="mx-4">{item.quantity}</p>
                    <button
                      onClick={() => handleIncrement(item.idMeal)}
                      className="bg-gray-300 py-2 px-4 "
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-4">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg p-5">
            <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
            {items.map((item) => (
              <div key={item.idMeal} className="flex justify-between mt-2">
                <p className="text-gray-500">{item?.strMeal}</p>
                <p className="text-gray-500">{`${item.quantity} x ${item?.price} = ${item.totalPrice}`}</p>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <p className="text-lg font-semibold text-gray-800">Total:</p>
              <p className="text-lg font-semibold text-gray-800">
                ₹{calculateTotalPrice()}
              </p>
            </div>
          </div>
          <button
            onClick={() => handlePlaceOrder(items)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 w-full rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
