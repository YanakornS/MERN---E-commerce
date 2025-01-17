import React, { useRef, useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import productList from "./Product.json";
import Card from "../../components/Card";
import ProductService from "./../../services/product.service";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
    >
      Next
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
    >
      Back
    </div>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductService.getAllProducts();
      const data = response.data;
      const special = data.filter((item) => item.category === "clothing");

      setProducts(special);
    };
    fetchData();
  }, []);

  const slider = useRef(null);
  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    nexArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Item</p>
        <h2 className="title">Standout Items from Out Products</h2>
      </div>
      <div className="md:absolute right-3 top-8 mb-10 md:24 space-x-2">
        <button
          className="btn bg-red p-2 rounded-full h-12 w-10 mt-5 text-white"
          onClick={() => slider?.current?.slickPrev()}
        >
          &lt;
        </button>
        <button
          className="btn bg-red p-2 rounded-full h-12 w-10 mt-5 text-white"
          onClick={() => slider?.current?.slickNext()}
        >
          &gt;
        </button>
      </div>
      <div className="slider-container">
        <Slider
          ref={slider}
          {...setting}
          className="overflow-hidden mt-10 space-x-5"
        >
          {products.length > 0 &&
            products.map((item, index) => {
              return <Card item={item} key={index} />;
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Product;
