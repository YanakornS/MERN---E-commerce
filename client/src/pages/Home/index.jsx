import React from "react";
import Categories from "./Categories";
import Banner from "./Banner";
import Product from "./Product";
import Service from "./Service";
import Testimonials from "./Testimonials";

const index = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <Product />
      <Service />
      <Testimonials />
    </div>
  );
};

export default index;
