import { useEffect, useState } from "react";
import backend from "../api/backend";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import { serverRoute } from "../constant/constants";

export default function ProductDescription() {
  const param = useParams();
  const [product, setProduct] = useState();
  const [imageIndex, setImageIndex] = useState(0);

  const getProductDescriptionBySlug = async () => {
    try {
      const productBySlug = `${serverRoute.PUBLIC_ROUTE}/${param.slug}`;
      const productResponse = await backend.get(productBySlug);
      setProduct(productResponse.data.data);
    } catch (error) {
      console.log("some thing went wrong ", error);
    }
  };
  useEffect(() => {
    getProductDescriptionBySlug();
  }, []);
  if (!product) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }
  const {
    title,
    price,
    description,
    colorVariants,
    images,
    brand: { name: brandName },
  } = product;

  return (
    <div className="max-w-5xl mx-auto">
      <NavBar />
      <div className=" flex flex-col-reverse sm:items-center sm:flex-row border border-orange-500 gap-3 h-[350px] p-2 rounded-md">
        <div className="flex gap-2 flex-row justify-center sm:flex-col">
          {images.map((image, index) => {
            return (
              <div
                key={index}
                className="w-24 h-14 relative cursor-pointer hover:scale-105 backdrop-blur-xl"
                onClick={() => setImageIndex(index)}
              >
                <img
                  src={image}
                  alt=""
                  className="absolute w-full h-full rounded-md"
                />
              </div>
            );
          })}
        </div>
        <div className="flex-1 w-100 sm:w-80 h-80 relative transition-all">
          <img
            src={images[imageIndex]}
            className="absolute w-full h-full rounded-md"
          />
        </div>
      </div>
      <div className="border border-orange-500 mt-4 text-black dark:text-white rounded-md p-3">
        <div className="flex gap-3 relative">
          <h4>Title:</h4>
          <span className="flex ">{title}</span>{" "}
          <span className="text-sm bg-orange-200 text-black rounded-lg flex items-center px-2 absolute left-48">
            {brandName}
          </span>
        </div>
        <div className="flex gap-3">
          <h4>Price:</h4>
          <span className="text-orange-500 font-bold">
            Rs <span>{price}</span>
          </span>
        </div>
        <div className="flex gap-3">
          <h6>Description:</h6>
          <div
            className="text-gray-100"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className="flex">
          <span>Color:</span>
          {colorVariants.map((productColor) => {
            const {
              color: { colorValue },
            } = productColor;
            return (
              <div
                className={`w-6 h-6 border border-black mx-2 rounded-[50%]  cursor-pointer`}
                style={{ backgroundColor: colorValue }}
                key={colorValue}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
