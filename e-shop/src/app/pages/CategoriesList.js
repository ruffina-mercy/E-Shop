import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hooks/hooks";
import {
  fetchCategoryDetails,
  selectCategory,
} from "../state/features/category/CategorySlice";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory).categories;

  useEffect(() => {
    dispatch(fetchCategoryDetails());
  }, [dispatch]);

  useEffect(() => {}, [category]);

  return (
    <div className="container">
      <h2 className="my-4 text-gray-800 text-xl font-semibold">
        Meal Categories
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {category.map((category) => (
          <div
            key={category.idCategory}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <Link
              to={`/item?category=${category.strCategory}`}
              className="block"
            >
              <img
                className="object-cover object-center w-full h-48"
                src={category.strCategoryThumb}
                alt={`Category: ${category.strCategory}`}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {category.strCategory}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
