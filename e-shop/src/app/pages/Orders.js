import React, { useState, useEffect } from "react";
import { useAppSelector } from "../state/hooks/hooks";
import { selectCartItemList } from "../state/features/cartItem/CartItemSlice";

const Orders = () => {
  const orderLists = useAppSelector(selectCartItemList).cartItemList;

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    orderLists?.forEach((orderList) => {
      orderList?.forEach((item) => {
        totalPrice += item.price * item.quantity;
      });
    });
    return totalPrice.toFixed(2);
  };

  return (
    <div className="container mt-4 w-1/2">
      <h2 className="text-lg font-semibold text-gray-800">Orders</h2>
      <div className="flex justify-end mt-4">
        <p className="text-lg font-semibold text-gray-800">Total:</p>
        <p className="text-lg font-semibold text-gray-800">
          ₹{calculateTotalPrice()}
        </p>
      </div>
      {orderLists?.map((orderList, index) => (
        <div key={index} className="mb-4">
          {orderList?.map((item) => (
            <div
              key={item.idMeal}
              className="bg-white rounded-xl overflow-hidden shadow-lg p-5 mb-4"
            >
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
                  <p className="text-gray-500">{`${item.quantity} x ${item?.price} = ${item.totalPrice}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;
