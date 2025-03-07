import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "खबर पालिका", slug: "technology" },
  { name: "मंत्री संतरी", slug: "business" },
  { name: "कोर्ट कचेरी", slug: "health" },
  { name: "अनुकर्णिया", slug: "education" },
  { name: "अपना एमपी", slug: "entertainment" },
  { name: "यह भी पढिये", slug: "knowladge" },

];

const CategoryNavigation = () => {
  return (
    <div className="bg-blue-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              to={`/category/${cat.slug}`}
              className="text-blue-500 hover:underline text-lg"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryNavigation;
