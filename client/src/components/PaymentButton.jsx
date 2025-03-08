import stripeService from "../services/stripe.service";
import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";

const PaymentButton = ({ cartItems }) => {
  const { user } = useContext(AuthContext);
  const handleCheckout = () => {
    console.log("cartItems: ", cartItems);
    stripeService
      .createCheckoutSession({
        cart: cartItems,
        email: user.email,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => {
        console.error("Error creating checkout session:", error);
      });
  };

  return (
    <>
      <button
        className="btn btn-md bg-red text-white px-8 py-1"
        onClick={() => handleCheckout()}
      >
        Proceed to checkout
      </button>
    </>
  );
};

export default PaymentButton;
