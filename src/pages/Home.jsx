import React, { useEffect, useState } from "react";
import backend from "../api/backend";
import ProductCard from "../components/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import { serverRoute } from "../constant/constants";

export default function Home() {
  const [listOfProducts, setListOfProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
  const [requestedPage, setRequestedPage] = useState(1);

  const getProducts = async () => {
    try {
      const latestProduct = `${serverRoute.LATEST}?page=${requestedPage}`;
      const productsResponse = await backend.get(latestProduct);

      setListOfProducts((previousProducts) => [
        ...previousProducts,
        ...productsResponse.data.data.docs,
      ]);

      setHasNextPage(productsResponse.data.data.pagination.nextPage);
      setRequestedPage(requestedPage + 1);
      setProductLoading(false);
    } catch (error) {
      console.log("some thing went wrong ", error);
    }
  };
  useEffect(() => {
    document.title = "Products";
    getProducts();
  }, []);
  if (productLoading.isInitialLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <React.Fragment>
      <main className="">
        <NavBar isHomePage />
        <section className="mx-auto">
          <InfiniteScroll
            dataLength={listOfProducts.length}
            next={getProducts}
            hasMore={hasNextPage}
            loader={
              <div className="text-lg text-black dark:text-white flex justify-center opacity-50 font-semibold">
                <h1>Loading...</h1>
              </div>
            }
            endMessage={
              <p className="text-lg text-black dark:text-white flex justify-center opacity-50 font-semibold">
                No more data to load.
              </p>
            }
          >
            <div className="grid grid-col-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {listOfProducts?.map((product) => {
                return <ProductCard product={product} key={product._id} />;
              })}
            </div>
          </InfiniteScroll>
        </section>
      </main>
    </React.Fragment>
  );
}
