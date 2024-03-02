import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";

export default function ProductCard({ product }) {
  const { title, images, price, slug } = product;
  return (
    <div className="rounded-xl overflow-hidden border-gray-300 border dark:border-orange-400">
      <div className="bg-white shadow-lg  relative">
        <Link to={`/products/${slug}`}>
          <div className="relative w-100 h-[450px]">
            <img
              className="absolute w-full h-full hover:scale-105 transition-all"
              src={images[0]}
              alt={title}
              style={{
                objectFit: "cover",
              }}
              loading="lazy"
            />
          </div>
        </Link>
        <div className="absolute bottom-0 w-full bg-gray-50 dark:bg-white text-black dark:text-black px-3 py-2 border">
          <p className="text-lg font-semibold"> {title}</p>
          <div className="text-md flex justify-between">
            <span className="font-bold text-xl text-orange-500">
              Rs.<span>{price}</span>
            </span>
            <Link
              to=""
              className="flex py-1.5 px-3 justify-center items-center me-1 mb-2 text-sm font-medium rounded-lg outline-white ring-orange-500 border-orange-500 border bg-orange-500 hover:bg-orange-600 text-white"
            >
              <GoEye className="me-1 text-md mt-[2px]" />
              <span className="text-xs ">View details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
