import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, removeFromCart } from "../../redux/features/Cart/CartSlice"; // Assuming you have a remove action
import { getImgUrl } from "../../utils/getimgUrl";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleClearCart = () => {
    // Add your clear cart logic
    dispatch(clearCart())
   
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0);

  return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="text-lg font-medium text-gray-900">Shopping Cart</div>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              onClick={handleClearCart}
              className="py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            {
                cartItems.length >0 ?(      
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems.length > 0 ? (
                      cartItems.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              alt=" "
                              src={`${getImgUrl(product?.coverImage)}`}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
      
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link to={`/books/${product.id}`}>{product?.title}</Link>
                                </h3>
                                <p className="sm:ml-4">${product?.newPrice}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 capitalize">
                                <strong>Category: </strong> {product?.category || "Unknown"}
                              </p>
                            </div>
                            <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                              <p className="text-gray-500">
                                <strong>Qty:</strong> {product.quantity || 1}
                              </p>
      
                              <div className="flex">
                                <button
                                onClick={()=>
                                    handleRemoveFromCart(product)
                                }
                                  type="button"
                                  
                                  className="font-medium text-red-600 hover:text-red-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">Your cart is empty.</p>
                    )}
                  </ul>):(<p> No Products Found</p>)
            }

          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <Link to="/">
            or{" "}
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
