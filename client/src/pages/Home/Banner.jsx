import React from "react";
import ProductItem from "../../components/ProductItem";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-beyween items-center">
        <div className="md:w-1/2">
          <img src="/images/home/banner.png" alt="" />
          <div className="flex flex-col md:flex-row item-center justify-around mt-16 gap-4">
            <ProductItem
              image="/images/home/headphone.png"
              name="Headphone"
              rating="1"
              price="1199"
            />

            <ProductItem
              image="/images/home/gamepad.png"
              name="Ganepad"
              rating="3"
              price="499"
            />
          </div>
        </div>
        <div className="md:w-1/2" space-y-7 px-4>
          <h2 className="md:text-4xl text-4xl font-bold md:leading-snug leading-sung">
            Discover Uniq{" "}
            <span className="text-red"> Software Engineering swag</span> for
            Every Coding enthusiat!
          </h2>
          <p className="text-xl.text-[#4A4A4A]">
            Our Mission : To merge fashion with functionality in the world of
            Software Engineering
          </p>
          <a
            className="btn bg-red px-8 py-3 font-semibold text-white rounded-full"
            href="/shop"
          >
            Order Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
