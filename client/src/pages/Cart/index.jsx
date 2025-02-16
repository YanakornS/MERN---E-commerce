import React, { useContext } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import CartService from "../../services/cart.service";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const Index = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  const handleClearCart = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your shopping cart will be permanently cleared!",
      showCancelButton: true,
     
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3096/3096673.png", 
      imageWidth: 70,
      imageHeight: 70,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.clearCart(user?.email);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              title: "Cart emptied!",
              text: "Your shopping cart is now empty.",
              timer: 1500,
              showConfirmButton: false,
              imageUrl: "https://cdn-icons-png.flaticon.com/512/2907/2907762.png", 
              imageWidth: 70,
              imageHeight: 70,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Something went wrong. Please try again.",
          });
        }
      }
    });
  };
  

  const handleDeleteItem = async (cartItem) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.deleteCartItem(cartItem._id);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };

  const handleIncrease = async (cartItem) => {
    if (cartItem.quantity + 1 > 10) {
      Swal.fire({
        icon: "warning",
        title: "Maximum quantity reached!",
        text: "You can only add up to 10 items.",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    try {
      const response = await CartService.updateCartItem(cartItem._id, {
        quantity: cartItem.quantity + 1,
      });
      if (response.status === 200) {
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleDecrease = async (cartItem) => {
    if (cartItem.quantity > 1) {
      try {
        const response = await CartService.updateCartItem(cartItem._id, {
          quantity: cartItem.quantity - 1,
        });
        if (response.status === 200) {
          refetch();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    } else {
      handleDeleteItem(cartItem);
    }
  };

  let totalPrice = 0;

  if (cart && cart.length > 0) {
    cart.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
  }

  // แปลง totalPrice เป็นสกุลเงินไทย (THB)
  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <div className="bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
          <div className="py-28 flex flex-col items-center justify-center">
            <div className="text-center px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold">
                Items Added to The <span className="text-red">Cart</span>
              </h2>
            </div>
          </div>
        </div>
        {cart.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-red text-white text-center">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price Per Unit</th>
                  <th>Price</th>
                  <th>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((cartItem, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={cartItem.image} alt={cartItem.name} />
                        </div>
                      </div>
                    </td>
                    <td className="font-bold">{cartItem.name}</td>
                    <td>
                      <div className="space-x-6 text-center">
                        <button
                          className="btn btn-xs mr-6"
                          onClick={() => handleDecrease(cartItem)}
                        >
                          -
                        </button>
                        {cartItem.quantity}
                        <button
                          className="btn btn-xs mr-2"
                          onClick={() => handleIncrease(cartItem)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      {formatPrice(cartItem.price)}
                    </td>
                    <td className="text-center">
                      {formatPrice(cartItem.quantity * cartItem.price)}
                    </td>
                    <td className="text-center">
                      <button onClick={() => handleDeleteItem(cartItem)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              
            </table>
            <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8 ">
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <p className="">Name : {user?.displayName}</p>
                <p className="">Email : {user?.email}</p>
                <p className="">UserId : {user?.uid}</p>
              </div>
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Shopping Details</h3>
                <p className="">Total Items : {cart.length}</p>
                <p className="">Total Price : {formattedTotalPrice}</p>
                <a
                  href="/check-out"
                  className="btn btn-md bg-red text-white px-8 py-1"
                >
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xl font-bold text-center text-red">
            <div className="text-xl font-bold text-center text-red">
              Shopping cart is Empty!
            </div>
            <button
              className="btn bg-red text-white rounded-full px-5 flex items-center gap-2"
              onClick={() => window.location.replace("/shop")}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
