export const getCategories = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "error");
  }
};
