import React from "react";
import ProductItem from "../../components/ProductItem";

const Testimonials_v_Oxe = () => {
  return (
    <div>
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-24 flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2">
            <img
              src="/images/home/testimonials/testimonials.png"
              alt="testimonials"
            />
            <div className="flex flex-col md:flex-row items-center justify-around mt-16 gap-4">
              <ProductItem
                image="/images/home/headphone.png"
                name="Headphone"
                rating="1"
                price="1199"
              />
              <ProductItem
                image="/images/home/gamepad.png"
                name="Gamepad"
                rating="3"
                price="499"
              />
            </div>
          </div>

          <div className="md:w-1/2 space-y-7 px-4">
            <h2 className="md:text-2xl text-2xl  md:leading-snug leading-sung">
              <span className="text-red "> Testimonials</span>
            </h2>
            <h2 className="md:text-4xl text-4xl font-bold md:leading-snug leading-sung">
              What Our Customers
              <h3>Say About US </h3>
              <span className="text-[#4A4A4A] text-lg">
                "As a Software developer i'm always on the lookout for unique
                accessories to experess my love for coding. The Keyboard Key
                Keychain is not only stylish but also durable. Will defintely be
                puchasing more items!"
              </span>
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Our Mission: To merge fashion with functionality in the world of
              Software Engineering
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials_v_Oxe;
