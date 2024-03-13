import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hooks/hooks";
import {
  AddToCart,
  selectItem,
  UpdateCart,
  ViewCartDetails,
} from "../state/features/Item/ItemSlice";

const Items = () => {
  const location = window.location.search; // Example value: "?category=Dessert"

  // Create a new URLSearchParams object with the query string
  const searchParams = new URLSearchParams(location);

  // Get the value associated with the "category" parameter
  const categoryValue = searchParams.get("category"); // "Dessert"
  const history = useNavigate();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItem).cartData;

  // Fallback to a default category name if categoryName is not provided
  const category = categoryValue || "Seafood"; // Default category name

  const handleitemClick = (item) => {
    dispatch(ViewCartDetails(item));
    history("/viewItem");
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const mergedArr = data.meals.map((item, index) => {
          item.price = (index + 1) * 20;
          item.quantity = 1;
          item.totalPrice = item.price;
          const matchingCartItem = items.find(
            (cartItem) => cartItem.idMeal === item.idMeal
          );
          if (matchingCartItem) {
            return { ...item, ...matchingCartItem };
          }
          return item;
        });
        setMeals(mergedArr);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [category, items]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h2 className="my-4 text-gray-800 text-xl font-semibold">
        Meals for {category}
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {meals?.map((meal) => (
          <div
            key={meal.idMeal}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            {/* <Link to={`/viewItem`} className="block"> */}
            <img
              className="object-cover object-center w-full h-48"
              src={meal.strMealThumb}
              alt={`Meal: ${meal.strMeal}`}
              onClick={() => handleitemClick(meal)}
            />
            {/* </Link> */}
            <div className="flex flex-col justify-center items-center p-5">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {meal.strMeal}
                </h2>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {meal.totalPrice}
                </h2>
              </div>
              {items.some((item) => item.idMeal === meal.idMeal) ? (
                <div className="flex justify-center items-center">
                  <button
                    onClick={() =>
                      dispatch(UpdateCart(meal.idMeal, "decrement"))
                    }
                    className="bg-gray-300 py-2 px-4"
                  >
                    -
                  </button>
                  <p className="mx-4">{meal.quantity}</p>
                  <button
                    onClick={() =>
                      dispatch(UpdateCart(meal.idMeal, "increment"))
                    }
                    className="bg-gray-300 py-2 px-4"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                  onClick={() => dispatch(AddToCart(meal))}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
