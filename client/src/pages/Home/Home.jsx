import React from "react";
import Category from "./Category";
import Banner from "./Banner";
import Product from "./Product";
import Service from "./Service";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <Product />
      <Service />
      <Testimonials />
    </div>
  );
};

export default Home;
