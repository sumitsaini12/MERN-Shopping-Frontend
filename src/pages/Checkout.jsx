import { Navigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  deleteItemFromCartAsync,
  selectItems,
  updataCartAsync,
} from "../features/cart/cartSlice";
import { useState } from "react";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { selectUserInfo, updateUserAsync } from "../features/user/userSlice";
import { discountedPrice } from "../app/constants";

function Checkout() {
  const items = useSelector(selectItems);
  const user = useSelector(selectUserInfo);
  console.log("user checkout page", user);
  const currentOrder = useSelector(selectCurrentOrder);
  const dispatch = useDispatch();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const UserImpformation = (values) => {
    console.log("submit Data", values);
    dispatch(
      updateUserAsync({ ...user, addresses: [...user.addresses, values] })
    );
    handleReset();
  };

  const schema = Yup.object({
    fullName: Yup.string().required(),
    email: Yup.string().email().required(),
    phone: Yup.number().required(),
    country: Yup.string().required(),
    street: Yup.string().required(),
    city: Yup.string().required(),
    region: Yup.string().required(),
    pinCode: Yup.number().required(),
  });

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    handleReset,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      street: "",
      city: "",
      region: "",
      pinCode: "",
    },
    onSubmit: UserImpformation,
    validationSchema: schema,
  });

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  // cart function
  const totalAmount = items.reduce((amount, item) => {
    return discountedPrice(item) * item.quantity + amount;
  }, 0);

  const totalItems = items.reduce((total, item) => {
    return +item.quantity + total;
  }, 0);

  const handleQuantity = (e, item) => {
    dispatch(updataCartAsync({ ...item, quantity: e.target.value }));
  };

  const handleRemove = (itemId) => {
    dispatch(deleteItemFromCartAsync(itemId));
  };

  const handleOrder = (e) => {
    const order = {
      items,
      totalAmount,
      totalItems,
      user,
      selectedAddress,
      paymentMethod,
      status: "padding", //other status can be delivered, received
    };
    if (selectedAddress) {
      dispatch(createOrderAsync(order));
    } else {
      alert("please select Your current Addresss");
    }

    //TODO: Redirect to order-success page
    //TODO: clear cart after order
    //TODO: on server change the stock number of items
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white px-5 py-12 mt-12">
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        FullName
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          value={values.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {touched.fullName && errors.fullName && (
                        <p className="text-red-500 text-sm">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        email
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          name="phone"
                          type="number"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {touched.phone && errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          value={values.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>INDIA</option>
                          <option>Mexico</option>
                          <option>PAKISTAN</option>
                        </select>
                      </div>
                      {touched.country && errors.country && (
                        <p className="text-red-500 text-sm">{errors.country}</p>
                      )}
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="street"
                          id="street-address"
                          autoComplete="street"
                          value={values.street}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {touched.street && errors.street && (
                        <p className="text-red-500 text-sm">{errors.street}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {touched.city && errors.city && (
                        <p className="text-red-500 text-sm">{errors.city}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="region"
                          id="region"
                          autoComplete="address-level1"
                          value={values.region}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {touched.region && errors.region && (
                        <p className="text-red-500 text-sm">{errors.region}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pin"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        PIN / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="pinCode"
                          id="pin"
                          autoComplete="postal-code"
                          value={values.pinCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {touched.pinCode && errors.pinCode && (
                        <p className="text-red-500 text-sm">{errors.pinCode}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    onClick={handleReset}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900 px-4 py-1 rounded-md border"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Addresses
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from Existing addresses
                  </p>
                  <ul role="list">
                    {user.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                      >
                        <div className="flex gap-x-4">
                          <input
                            name="address"
                            type="radio"
                            value={index}
                            onChange={(e) => handleAddress(e)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.firstName} {address.lastName}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Phone: {address.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            {address.city}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            type="radio"
                            value="cash"
                            onChange={handlePayment}
                            checked={paymentMethod === "cash"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            value="card"
                            type="radio"
                            onChange={handlePayment}
                            checked={paymentMethod === "card"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* shopping Cart page */}
          <div className="lg:col-span-2">
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h2 className="text-5xl font-bold my-5">Cart</h2>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items &&
                      items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.title}</h3>
                                <p className="ml-4"> ${discountedPrice(item)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty
                                </label>
                                <select
                                  id="quantity"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantity(e, item)}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() => handleRemove(item.id)}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>
                    <span className="text-slate-900 font-bold">$</span>
                    {totalAmount}
                  </p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>
                    {totalItems}{" "}
                    <span className="text-slate-600 text-sm">items</span>
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-800 cursor-pointer"
                  >
                    Order Now
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      {" "}
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
